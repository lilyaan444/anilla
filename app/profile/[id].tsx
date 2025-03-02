import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '../../src/lib/supabase';
import { useTranslation } from '../../src/hooks/useTranslation';
import { profileStyles as styles } from '../../src/styles';
import { Ionicons } from '@expo/vector-icons';

export default function FriendProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    reviewCount: 0,
    cigarCount: 0,
    favoriteOrigin: '',
    followingCount: 0,
    followersCount: 0
  });
  const [reviews, setReviews] = useState([]);
  const [cigars, setCigars] = useState([]);
  const [activeTab, setActiveTab] = useState('stats'); // 'stats', 'reviews', 'cigars'

  useEffect(() => {
    fetchFriendProfile();
    fetchFriendStats();
    fetchFriendReviews();
    fetchFriendCigars();
  }, [id]);

  const fetchFriendProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching friend profile:', error);
    }
  };

  const fetchFriendStats = async () => {
    try {
      const [reviews, cigars, following, followers] = await Promise.all([
        supabase.from('reviews').select('*', { count: 'exact' }).eq('user_id', id),
        supabase.from('cigars').select('*', { count: 'exact' }).eq('created_by', id),
        supabase.from('friendships').select('*', { count: 'exact' }).eq('sender_id', id).eq('status', 'accepted'),
        supabase.from('friendships').select('*', { count: 'exact' }).eq('receiver_id', id).eq('status', 'accepted')
      ]);

      setStats({
        reviewCount: reviews.count || 0,
        cigarCount: cigars.count || 0,
        favoriteOrigin: '',
        followingCount: following.count || 0,
        followersCount: followers.count || 0
      });
    } catch (error) {
      console.error('Error fetching friend stats:', error);
    }
  };

  const fetchFriendReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          id,
          rating,
          comment,
          created_at,
          cigar_id,
          cigars:cigar_id (
            id,
            name,
            image
          )
        `)
        .eq('user_id', id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      console.log('Reviews fetched:', data);
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching friend reviews:', error);
    }
  };

  const fetchFriendCigars = async () => {
    try {
      const { data, error } = await supabase
        .from('cigars')
        .select('id, name, origin, image, created_at')
        .eq('created_by', id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      console.log('Cigars fetched:', data);
      setCigars(data || []);
    } catch (error) {
      console.error('Error fetching friend cigars:', error);
    }
  };

  const navigateToCigar = (cigarId) => {
    router.push(`/cigar/${cigarId}`);
  };

  const navigateToReview = (reviewId) => {
    router.push(`/review/${reviewId}`);
  };

  if (!profile) return null;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: profile.avatar_url }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{profile.display_name}</Text>
          {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
            onPress={() => setActiveTab('stats')}
          >
            <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>
              {t('profile.stats')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
              {t('profile.reviews')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'cigars' && styles.activeTab]}
            onPress={() => setActiveTab('cigars')}
          >
            <Text style={[styles.tabText, activeTab === 'cigars' && styles.activeTabText]}>
              {t('profile.cigars')}
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'stats' && (
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>{t('profile.stats')}</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.reviewCount}</Text>
                <Text style={styles.statLabel}>{t('profile.reviews')}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.cigarCount}</Text>
                <Text style={styles.statLabel}>{t('profile.cigarsAdded')}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.followingCount}</Text>
                <Text style={styles.statLabel}>{t('profile.following')}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.followersCount}</Text>
                <Text style={styles.statLabel}>{t('profile.followers')}</Text>
              </View>
            </View>
          </View>
        )}

{activeTab === 'reviews' && (
    <View style={styles.reviewsSection}>
      <Text style={styles.sectionTitle}>{t('profile.recentReviews')}</Text>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <TouchableOpacity
            key={review.id}
            style={styles.reviewItem}
            onPress={() => navigateToReview(review.id)}
          >
            <Image
              source={{ uri: review.cigars?.image || 'https://via.placeholder.com/100' }}
              style={styles.reviewImage}
            />
            <View style={styles.reviewContent}>
              <Text style={styles.reviewCigarName}>{review.cigars?.name || 'Cigare inconnu'}</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Ionicons
                    key={star}
                    name={star <= review.rating ? "star" : "star-outline"}
                    size={16}
                    color="#8B4513"
                  />
                ))}
              </View>
              {review.comment && (
                <Text style={styles.reviewComment} numberOfLines={2}>
                  {review.comment}
                </Text>
              )}
              <Text style={styles.reviewDate}>
                {new Date(review.created_at).toLocaleDateString()}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyStateText}>{t('profile.noReviews')}</Text>
      )}
    </View>
  )}

  {activeTab === 'cigars' && (
    <View style={styles.cigarsSection}>
      <Text style={styles.sectionTitle}>{t('profile.addedCigars')}</Text>
      {cigars.length > 0 ? (
        cigars.map(cigar => (
          <TouchableOpacity
            key={cigar.id}
            style={styles.cigarItem}
            onPress={() => navigateToCigar(cigar.id)}
          >
            <Image
              source={{ uri: cigar.image || 'https://via.placeholder.com/100' }}
              style={styles.cigarImage}
            />
            <View style={styles.cigarContent}>
              <Text style={styles.cigarName}>{cigar.name}</Text>
              {cigar.origin && (
                <Text style={styles.cigarOrigin}>{cigar.origin}</Text>
              )}
              {cigar.format && (
                <Text style={styles.cigarFormat}>{cigar.format}</Text>
              )}
              <Text style={styles.cigarDate}>
                {new Date(cigar.created_at).toLocaleDateString()}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyStateText}>{t('profile.noCigars')}</Text>
      )}
    </View>
  )}
      </ScrollView>
    </View>
  );
}