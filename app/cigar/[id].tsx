import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, TextInput, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCigars } from '../../src/hooks/useCigars';
import { useFavoritesStore } from '../../src/store/favorites';
import { useReviews } from '../../src/hooks/useReviews';
import { useEffect, useState } from 'react';
import { useAuth } from '../../src/providers/AuthProvider';
import { useTranslation } from '../../src/hooks/useTranslation';

export default function CigarDetailScreen() {
  const { t } = useTranslation();  // Ajout de l'initialisation du hook
  const { id } = useLocalSearchParams();
  const { cigars, loading: cigarsLoading, error: cigarsError } = useCigars();
  const { reviews, userReview, loading: reviewsLoading, error: reviewsError, addReview, updateReview, deleteReview } = useReviews(id as string);
  const { addFavorite, removeFavorite, isFavorite, fetchFavorites } = useFavoritesStore();
  const { session } = useAuth();

  const [rating, setRating] = useState(userReview?.rating || 5);
  const [comment, setComment] = useState(userReview?.comment || '');
  const [isEditing, setIsEditing] = useState(false);

  const cigar = cigars.find(c => c.id === id);
  const favorite = isFavorite(id as string);

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (userReview) {
      setRating(userReview.rating);
      setComment(userReview.comment);
    }
  }, [userReview]);

  if (cigarsLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>{t('common.loading')}</Text>
      </View>
    );
  }

  if (cigarsError || !cigar) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>
          {cigarsError || t('cigar.notFound')}
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{t('common.goBack')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleFavorite = async () => {
    if (!session) {
      Alert.alert(
        'Sign In Required',
        'Please sign in to add favorites',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Sign In',
            onPress: () => router.push('/profile')
          }
        ]
      );
      return;
    }

    try {
      if (favorite) {
        await removeFavorite(cigar.id);
      } else {
        await addFavorite(cigar.id);
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const handleReviewSubmit = async () => {
    if (!session) {
      Alert.alert(
        'Sign In Required',
        'Please sign in to add a review',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Sign In',
            onPress: () => router.push('/profile')
          }
        ]
      );
      return;
    }

    try {
      if (userReview) {
        await updateReview(rating, comment);
      } else {
        await addReview(rating, comment);
      }
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const handleDeleteReview = async () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete your review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview();
              setRating(5);
              setComment('');
              setIsEditing(false);
            } catch (error) {
              Alert.alert('Error', (error as Error).message);
            }
          }
        }
      ]
    );
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'No ratings';

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: cigar.image }} style={styles.image} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.name}>{cigar.name}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>{t('cigar.origin')}</Text>
              <Text style={styles.infoValue}>{cigar.origin}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>{t('cigar.format')}</Text>
              <Text style={styles.infoValue}>{cigar.format}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>{t('cigar.rating')}</Text>
              <Text style={styles.infoValue}>{averageRating}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('cigar.flavorProfile')}</Text>
            <Text style={styles.flavorText}>{cigar.flavor}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('cigar.description')}</Text>
            <Text style={styles.description}>{cigar.description}</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.reviewHeader}>
              <Text style={styles.sectionTitle}>{t('cigar.reviews')}</Text>
              {session && (
                <TouchableOpacity
                  style={styles.addReviewButton}
                  onPress={() => setIsEditing(true)}>
                  <Text style={styles.addReviewButtonText}>
                    {userReview ? t('cigar.editReview') : t('cigar.addReview')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {isEditing ? (
              <View style={styles.reviewForm}>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setRating(star)}>
                      <Ionicons
                        name={rating >= star ? "star" : "star-outline"}
                        size={24}
                        color="#DAA520"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <TextInput
                  style={styles.reviewInput}
                  value={comment}
                  onChangeText={setComment}
                  placeholder="Write your review..."
                  multiline
                  numberOfLines={4}
                />
                <View style={styles.reviewActions}>
                  <TouchableOpacity
                    style={[styles.reviewButton, styles.reviewButtonCancel]}
                    onPress={() => {
                      setIsEditing(false);
                      if (userReview) {
                        setRating(userReview.rating);
                        setComment(userReview.comment);
                      }
                    }}>
                    <Text style={styles.reviewButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  {userReview && (
                    <TouchableOpacity
                      style={[styles.reviewButton, styles.reviewButtonDelete]}
                      onPress={handleDeleteReview}>
                      <Text style={styles.reviewButtonText}>Delete</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[styles.reviewButton, styles.reviewButtonSubmit]}
                    onPress={handleReviewSubmit}>
                    <Text style={styles.reviewButtonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.reviewsList}>
                {reviewsLoading ? (
                  <Text style={styles.loadingText}>Loading reviews...</Text>
                ) : reviews.length > 0 ? (
                  reviews.map((review) => (
                    <View key={review.id} style={styles.reviewItem}>
                      <View style={styles.reviewHeader}>
                        <View style={styles.ratingDisplay}>
                          {[...Array(review.rating)].map((_, i) => (
                            <Ionicons
                              key={i}
                              name="star"
                              size={16}
                              color="#DAA520"
                            />
                          ))}
                        </View>
                        <Text style={styles.reviewDate}>
                          {new Date(review.created_at).toLocaleDateString()}
                        </Text>
                      </View>
                      <Text style={styles.reviewText}>{review.comment}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noReviewsText}>No reviews yet</Text>
                )}
              </View>
            )}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionButton, favorite && styles.actionButtonActive]}
              onPress={toggleFavorite}>
              <Ionicons
                name={favorite ? "heart" : "heart-outline"}
                size={24}
                color={favorite ? "#FFFFFF" : "#8B4513"}
              />
              <Text style={[styles.actionText, favorite && styles.actionTextActive]}>
                {favorite ? t('cigar.removeFromFavorites') : t('cigar.addToFavorites')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF5E6',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#8B4513',
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 60 : 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#CD853F',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 8,
  },
  flavorText: {
    fontSize: 16,
    color: '#A0522D',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#A0522D',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addReviewButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addReviewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  reviewForm: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  reviewInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  reviewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reviewButtonCancel: {
    backgroundColor: '#CD853F',
  },
  reviewButtonDelete: {
    backgroundColor: '#DC3545',
  },
  reviewButtonSubmit: {
    backgroundColor: '#8B4513',
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  reviewsList: {
    gap: 12,
  },
  reviewItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
  },
  ratingDisplay: {
    flexDirection: 'row',
    gap: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#CD853F',
  },
  reviewText: {
    fontSize: 14,
    color: '#A0522D',
    marginTop: 8,
  },
  noReviewsText: {
    textAlign: 'center',
    color: '#CD853F',
    fontSize: 16,
    marginTop: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#DEB887',
  },
  actionButtonActive: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#8B4513',
  },
  actionTextActive: {
    color: '#FFFFFF',
  },
});