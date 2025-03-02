import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../src/lib/supabase';
import { useAuth } from '../../src/providers/AuthProvider';
import { useLanguage } from '../../src/hooks/useLanguage';
import { useTranslation } from '../../src/hooks/useTranslation';
import { profileStyles as styles } from '../../src/styles';
import { useRouter } from 'expo-router';

// Add new interfaces
interface UserProfile {
  id?: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  phone: string;
  provider: string;
  updated_at?: string;
  created_at?: string;
}

interface UserStats {
  reviewCount: number;
  cigarCount: number;
  favoriteOrigin: string;
}

interface Friend {
  id: string;
  display_name: string;
  avatar_url: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

interface Notification {
  id: string;
  type: string;
  content: any;
  read: boolean;
  created_at: string;
}

export default function ProfileScreen() {
  const router = useRouter();

  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);
const [notifications, setNotifications] = useState<Notification[]>([]);
const [unreadCount, setUnreadCount] = useState(0);

  // Déplacer ces hooks avant toute condition
  const [userProfile, setUserProfile] = useState<UserProfile>({
    display_name: '',
    bio: '',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    phone: '',
    provider: ''
  });
  const [userStats, setUserStats] = useState<UserStats>({
    reviewCount: 0,
    cigarCount: 0,
    favoriteOrigin: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Ajoutez ces lignes ici
  const [activeTab, setActiveTab] = useState('stats'); // 'stats', 'reviews', 'cigars'
  const [reviews, setReviews] = useState([]);
  const [cigars, setCigars] = useState([]);

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' }
  ];

  // Utiliser useEffect pour charger les données du profil quand l'utilisateur est connecté
  useEffect(() => {
    if (session?.user) {
      fetchUserProfile();
      fetchUserStats();
      fetchFriends();
      fetchNotifications();
      fetchUserReviews();
      fetchUserCigars();
    }
  }, [session]);

  const fetchFriends = async () => {
    try {
      // Récupérer les demandes envoyées
      const { data: sentRequests, error: sentError } = await supabase
        .from('friendships')
        .select('receiver_id, status, created_at')
        .eq('sender_id', session?.user?.id);

      if (sentError) throw sentError;

      // Récupérer les demandes reçues
      const { data: receivedRequests, error: receivedError } = await supabase
        .from('friendships')
        .select('sender_id, status, created_at')
        .eq('receiver_id', session?.user?.id);

      if (receivedError) throw receivedError;

      // Récupérer les profils des destinataires seulement s'il y en a
      const receiverIds = sentRequests?.map(req => req.receiver_id) || [];
      let receiverProfiles = [];

      if (receiverIds.length > 0) {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, display_name, avatar_url')
          .in('id', receiverIds);

        if (error) throw error;
        receiverProfiles = data || [];
      }

      // Récupérer les profils des expéditeurs seulement s'il y en a
      const senderIds = receivedRequests?.map(req => req.sender_id) || [];
      let senderProfiles = [];

      if (senderIds.length > 0) {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, display_name, avatar_url')
          .in('id', senderIds);

        if (error) throw error;
        senderProfiles = data || [];
      }

      // Combiner les données
      const sentFriends = sentRequests?.map(req => {
        const profile = receiverProfiles.find(p => p.id === req.receiver_id);
        return {
          id: req.receiver_id,
          display_name: profile?.display_name || 'Utilisateur inconnu',
          avatar_url: profile?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          status: req.status,
          created_at: req.created_at
        };
      }) || [];

      const receivedFriends = receivedRequests?.map(req => {
        const profile = senderProfiles.find(p => p.id === req.sender_id);
        return {
          id: req.sender_id,
          display_name: profile?.display_name || 'Utilisateur inconnu',
          avatar_url: profile?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          status: req.status,
          created_at: req.created_at
        };
      }) || [];

      setFriends([...sentFriends, ...receivedFriends]);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  // Ajouter cette fonction pour charger les notifications
  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setNotifications(data || []);
      setUnreadCount(data?.filter(n => !n.read).length || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Ajouter cette fonction pour envoyer une demande d'ami
  const sendFriendRequest = async (receiverId: string) => {
    try {
      const { error: friendshipError } = await supabase
        .from('friendships')
        .insert({
          sender_id: session?.user?.id,
          receiver_id: receiverId,
          status: 'pending'
        });

      if (friendshipError) throw friendshipError;

      const { error: notificationError } = await supabase
        .from('notifications')
        .insert({
          user_id: receiverId,
          type: 'friend_request',
          content: {
            sender_id: session?.user?.id,
            sender_name: userProfile.display_name
          }
        });

      if (notificationError) throw notificationError;

      Alert.alert(t('friends.requestSent'));
      fetchFriends();
    } catch (error) {
      console.error('Error sending friend request:', error);
      Alert.alert(t('common.error'), t('friends.requestError'));
    }
  };

  // Ajouter cette fonction pour répondre à une demande d'ami
  const respondToFriendRequest = async (senderId: string, accept: boolean) => {
    try {
      const { error: friendshipError } = await supabase
        .from('friendships')
        .update({ status: accept ? 'accepted' : 'rejected' })
        .eq('sender_id', senderId)
        .eq('receiver_id', session?.user?.id);

      if (friendshipError) throw friendshipError;

      const { error: notificationError } = await supabase
        .from('notifications')
        .insert({
          user_id: senderId,
          type: 'friend_response',
          content: {
            responder_id: session?.user?.id,
            responder_name: userProfile.display_name,
            accepted: accept
          }
        });

      if (notificationError) throw notificationError;

      fetchFriends();
      fetchNotifications();
    } catch (error) {
      console.error('Error responding to friend request:', error);
      Alert.alert(t('common.error'), t('friends.responseError'));
    }
  };


  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: email.split('@')[0],
          }
        }
      });
      if (error) throw error;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user?.id)
        .single();

      if (error) {
        // Si l'erreur est "No rows found", créer un nouveau profil
        if (error.code === 'PGRST116') {
          console.log('Profil non trouvé, création d\'un nouveau profil');
          await createInitialProfile();
          return;
        }
        throw error;
      }

      if (data) {
        setUserProfile({
          id: data.id,
          display_name: data.display_name || session?.user?.email?.split('@')[0] || '',
          bio: data.bio || '',
          avatar_url: data.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          phone: data.phone || '',
          provider: data.provider || 'email'
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Fonction pour créer un profil initial pour les utilisateurs existants
  const createInitialProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: session?.user?.id,
          display_name: session?.user?.email?.split('@')[0] || '',
          bio: '',
          avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          phone: '',
          provider: session?.user?.app_metadata?.provider || 'email',
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      // Récupérer le profil nouvellement créé
      await fetchUserProfile();
    } catch (error) {
      console.error('Error creating initial profile:', error);
    }
  };

  const fetchUserStats = async () => {
    try {
      // Get review count
      const { count: reviewCount } = await supabase
        .from('reviews')
        .select('*', { count: 'exact' })
        .eq('user_id', session?.user?.id);

      // Get cigars added count
      const { count: cigarCount } = await supabase
        .from('cigars')
        .select('*', { count: 'exact' })
        .eq('created_by', session?.user?.id);

      // Get favorite origin
      const { data: reviewsWithCigars } = await supabase
        .from('reviews')
        .select('cigar:cigars(origin)')
        .eq('user_id', session?.user?.id);

      // Extraire correctement les origines et trouver la plus fréquente
      let originCounts = {};
      let favoriteOrigin = '';

      if (reviewsWithCigars && reviewsWithCigars.length > 0) {
        reviewsWithCigars.forEach(review => {
          if (review.cigar && review.cigar.origin) {
            const origin = review.cigar.origin;
            originCounts[origin] = (originCounts[origin] || 0) + 1;
          }
        });

        // Trouver l'origine la plus fréquente
        favoriteOrigin = Object.keys(originCounts).reduce((a, b) =>
          originCounts[a] > originCounts[b] ? a : b, '');
      }

      setUserStats({
        reviewCount: reviewCount || 0,
        cigarCount: cigarCount || 0,
        favoriteOrigin
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: session?.user?.id,
          display_name: userProfile.display_name,
          bio: userProfile.bio,
          avatar_url: userProfile.avatar_url,
          phone: userProfile.phone,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      setIsEditing(false);
      Alert.alert(t('profile.profileUpdated'));
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert(t('common.error'), (error as Error).message);
    }
  };

  const handlePickImage = async () => {
    try {
      // Demander la permission d'accéder à la galerie
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(t('common.error'), t('profile.permissionDenied'));
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3,
      });

      if (!result.canceled) {
        setLoading(true);

        try {
          // Créer un nom de fichier unique
          const fileExt = result.assets[0].uri.split('.').pop();
          const fileName = `${session?.user?.id}-${Date.now()}.${fileExt}`;

          // Convertir l'URI en blob
          const response = await fetch(result.assets[0].uri);
          const blob = await response.blob();

          // Upload l'image vers Supabase Storage
          const { data, error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, blob, {
              contentType: `image/${fileExt}`,
              upsert: true
            });

          if (uploadError) throw uploadError;

          // Récupérer l'URL publique
          const { data: publicUrlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);

          // Mettre à jour le profil avec l'URL de l'image
          const imageUrl = publicUrlData.publicUrl;

          setUserProfile(prev => ({
            ...prev,
            avatar_url: imageUrl
          }));

          // Sauvegarder l'URL dans la base de données
          const { error: updateError } = await supabase
            .from('profiles')
            .upsert({
              id: session?.user?.id,
              avatar_url: imageUrl,
              updated_at: new Date().toISOString()
            });

          if (updateError) throw updateError;

          Alert.alert(t('profile.photoUpdated'));
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          Alert.alert(t('common.error'), t('profile.photoUploadError'));
        }
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert(t('common.error'), t('profile.photoPickError'));
    } finally {
      setLoading(false);
    }
  };

  // Remplacer la logique de rendu conditionnelle
  if (!session) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('profile.title')}</Text>
        </View>

        <View style={styles.authContainer}>
          <Text style={styles.authTitle}>{t('profile.authTitle')}</Text>

          {error && (
            <Text style={styles.errorText}>
              {error.includes('Invalid login') ? t('profile.invalidCredentials') : error}
            </Text>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('profile.email')}</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder={t('profile.emailPlaceholder')}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('profile.password')}</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder={t('profile.passwordPlaceholder')}
              secureTextEntry
              autoComplete="password"
              textContentType="password"
              returnKeyType="go"
              onSubmitEditing={handleSignIn}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.authButton, loading && styles.authButtonDisabled]}
              onPress={handleSignIn}
              disabled={loading}>
              <Text style={styles.authButtonText}>
                {loading ? t('common.loading') : t('profile.signIn')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.authButton, styles.authButtonSecondary, loading && styles.authButtonDisabled]}
              onPress={handleSignUp}
              disabled={loading}>
              <Text style={[styles.authButtonText, styles.authButtonTextSecondary]}>
                {t('profile.signUp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const fetchUserReviews = async () => {
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
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching user reviews:', error);
    }
  };

  const fetchUserCigars = async () => {
    try {
      const { data, error } = await supabase
        .from('cigars')
        .select('id, name, origin, flavor, format, description, image, created_at')
        .eq('created_by', session?.user?.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setCigars(data || []);
    } catch (error) {
      console.error('Error fetching user cigars:', error);
    }
  };

  const navigateToCigar = (cigarId) => {
    router.push(`/cigar/${cigarId}`);
  };

  const navigateToReview = (reviewId) => {
    router.push(`/review/${reviewId}`);
  };




  // Remplacer la logique de rendu conditionnelle
  if (!session) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('profile.title')}</Text>
        </View>

        <View style={styles.authContainer}>
          <Text style={styles.authTitle}>{t('profile.authTitle')}</Text>

          {error && (
            <Text style={styles.errorText}>
              {error.includes('Invalid login') ? t('profile.invalidCredentials') : error}
            </Text>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('profile.email')}</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder={t('profile.emailPlaceholder')}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('profile.password')}</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder={t('profile.passwordPlaceholder')}
              secureTextEntry
              autoComplete="password"
              textContentType="password"
              returnKeyType="go"
              onSubmitEditing={handleSignIn}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.authButton, loading && styles.authButtonDisabled]}
              onPress={handleSignIn}
              disabled={loading}>
              <Text style={styles.authButtonText}>
                {loading ? t('common.loading') : t('profile.signIn')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.authButton, styles.authButtonSecondary, loading && styles.authButtonDisabled]}
              onPress={handleSignUp}
              disabled={loading}>
              <Text style={[styles.authButtonText, styles.authButtonTextSecondary]}>
                {t('profile.signUp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Update the profile section in the return statement
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('profile.title')}</Text>
        {!isEditing && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}>
            <Ionicons name="pencil" size={24} color="#8B4513" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handlePickImage}>
            <Image
              source={{ uri: userProfile.avatar_url }}
              style={styles.avatar}
            />
            <View style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color="#FFF" />
            </View>
          </TouchableOpacity>

          {isEditing ? (
            <View style={styles.editProfileForm}>
              <TextInput
                style={styles.editInput}
                value={userProfile.display_name}
                onChangeText={(text) => setUserProfile(prev => ({ ...prev, display_name: text }))}
                placeholder={t('profile.usernamePlaceholder')}
              />
              <TextInput
                style={[styles.editInput, styles.bioInput]}
                value={userProfile.bio}
                onChangeText={(text) => setUserProfile(prev => ({ ...prev, bio: text }))}
                placeholder={t('profile.bioPlaceholder')}
                multiline
              />
              <TextInput
                style={styles.editInput}
                value={userProfile.phone}
                onChangeText={(text) => setUserProfile(prev => ({ ...prev, phone: text }))}
                placeholder={t('profile.phonePlaceholder')}
                keyboardType="phone-pad"
              />
              <View style={styles.editActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsEditing(false)}>
                  <Text style={styles.cancelButtonText}>{t('common.cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleUpdateProfile}>
                  <Text style={styles.saveButtonText}>{t('common.save')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <Text style={styles.username}>{userProfile.display_name || session?.user?.email}</Text>
              {userProfile.bio && <Text style={styles.bio}>{userProfile.bio}</Text>}
              {userProfile.phone && <Text style={styles.phone}>{userProfile.phone}</Text>}
            </>
          )}
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
                <Text style={styles.statNumber}>{userStats.reviewCount}</Text>
                <Text style={styles.statLabel}>{t('profile.reviews')}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userStats.cigarCount}</Text>
                <Text style={styles.statLabel}>{t('profile.cigarsAdded')}</Text>
              </View>
              {userStats.favoriteOrigin && (
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{userStats.favoriteOrigin}</Text>
                  <Text style={styles.statLabel}>{t('profile.favoriteOrigin')}</Text>
                </View>
              )}
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

                <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>{t('profile.settings')}</Text>
          <View style={styles.settingsSection}>
            <Text style={styles.settingsLabel}>{t('profile.language')}</Text>
            <View style={styles.languageOptions}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    language === lang.code && styles.activeLanguageOption,
                  ]}
                  onPress={() => setLanguage(lang.code)}>
                  <Text
                    style={[
                      styles.languageText,
                      language === lang.code && styles.activeLanguageText,
                    ]}>
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Bouton de déconnexion */}
        <View style={styles.signOutContainer}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
            disabled={loading}>
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.signOutButtonText}>
              {loading ? t('profile.signingOut') : t('profile.signOut')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>


  );
}
