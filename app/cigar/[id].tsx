import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, TextInput, Platform, Modal, Dimensions, KeyboardAvoidingView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCigars } from '../../src/hooks/useCigars';
import { useFavoritesStore } from '../../src/store/favorites';
import { useReviews } from '../../src/hooks/useReviews';
import { useEffect, useState } from 'react';
import { useAuth } from '../../src/providers/AuthProvider';
import { useTranslation } from '../../src/hooks/useTranslation';
import * as Haptics from 'expo-haptics';
import { useCigarPrices } from '../../src/hooks/useCigarPrices';
import { LineChart } from 'react-native-chart-kit';
import { cigarDetailStyles as styles } from '../../src/styles';

export default function CigarDetailScreen() {
  const { t } = useTranslation();  // Ajout de l'initialisation du hook
  const { id } = useLocalSearchParams();
  const { cigars, loading: cigarsLoading, error: cigarsError } = useCigars();
  const { reviews, userReview, loading: reviewsLoading, error: reviewsError, addReview, updateReview, deleteReview } = useReviews(id as string);
  const { addFavorite, removeFavorite, isFavorite, fetchFavorites } = useFavoritesStore();
  const { session } = useAuth();

  // Add with other hooks
  const { prices, loading: pricesLoading, addPrice, getAveragePrice } = useCigarPrices(id as string);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [newPrice, setNewPrice] = useState('');
  const [storeName, setStoreName] = useState('');

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
      // Ajouter le retour haptique
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(
          favorite
            ? Haptics.NotificationFeedbackType.Warning
            : Haptics.NotificationFeedbackType.Success
        );
      }

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
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
            <View style={styles.priceHeader}>
              <Text style={styles.sectionTitle}>{t('cigar.price')}</Text>
              {session && (
                <TouchableOpacity
                  style={styles.addPriceButton}
                  onPress={() => setShowPriceModal(true)}>
                  <Text style={styles.addPriceButtonText}>{t('cigar.addPrice')}</Text>
                </TouchableOpacity>
              )}
            </View>

            {pricesLoading ? (
              <Text style={styles.loadingText}>{t('cigar.loadingPrices')}</Text>
            ) : prices.length > 0 ? (
              <View>
                <View style={styles.priceStats}>
                  {getAveragePrice() && (
                    <View style={styles.priceStatItem}>
                      <Text style={styles.priceStatLabel}>{t('cigar.averagePrice')}</Text>
                      <Text style={styles.priceStatValue}>
                        {getAveragePrice().average.toFixed(2)}€
                      </Text>
                      <Text style={styles.priceStatSubtext}>
                        ({getAveragePrice().count} {t('cigar.prices')})
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.chartContainer}>
                  <LineChart
                    data={{
                      labels: [...prices]
                        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                        .map(p => new Date(p.created_at).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })),
                      datasets: [{
                        data: [...prices]
                          .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                          .map(p => p.price)
                      }]
                    }}
                    width={Dimensions.get('window').width - 50}
                    height={220}
                    chartConfig={{
                      backgroundColor: '#FFFFFF',
                      backgroundGradientFrom: '#FFFFFF',
                      backgroundGradientTo: '#FFFFFF',
                      decimalPlaces: 2,
                      color: (opacity = 1) => `rgba(139, 69, 19, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(139, 69, 19, ${opacity})`,
                      propsForLabels: {
                        fontSize: 10,
                      },
                      style: {
                        borderRadius: 16
                      },
                      // Ajout des configurations pour le web
                      useShadowColorFromDataset: false,
                      propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#8B4513'
                      }
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      marginHorizontal: -15,
                      borderRadius: 16
                    }}
                    withDots={Platform.OS === 'web' ? false : true}
                    withShadow={Platform.OS === 'web' ? false : true}
                    withScrollableDot={false}
                    withVerticalLines={false}
                    withHorizontalLines={true}
                    fromZero={true}
                  />
                </View>
              </View>
            ) : (
              <Text style={styles.noPricesText}>{t('cigar.noPrices')}</Text>
            )}
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
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
              >
                <View style={styles.reviewForm}>
                  <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity
                        key={star}
                        onPress={() => {
                          if (rating === star) {
                            setRating(star - 0.5);
                          } else {
                            setRating(star);
                          }
                        }}
                      >
                        <Ionicons
                          name={
                            rating >= star
                              ? "star"
                              : rating >= star - 0.5
                              ? "star-half"
                              : "star-outline"
                          }
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
              </KeyboardAvoidingView>
            ) : (
              <View style={styles.reviewsList}>
                {reviewsLoading ? (
                  <Text style={styles.loadingText}>Loading reviews...</Text>
                ) : reviews.length > 0 ? (
                  reviews.map((review) => (
                    <View key={review.id} style={styles.reviewItem}>
                      <View style={styles.reviewHeader}>
                        <View style={styles.ratingDisplay}>
                          {[...Array(5)].map((_, i) => (
                            <Ionicons
                              key={i}
                              name={
                                review.rating >= i + 1
                                  ? "star"
                                  : review.rating >= i + 0.5
                                  ? "star-half"
                                  : "star-outline"
                              }
                              size={16}
                              color="#DAA520"
                            />
                          ))}
                        </View>
                        <Text style={styles.reviewDate}>
                          {new Date(review.created_at).toLocaleDateString()}
                        </Text>
                      </View>
                      {review.comment ? (
                        <Text style={styles.reviewText}>{review.comment}</Text>
                      ) : (
                        <View style={styles.noCommentContainer}>
                          <Text style={styles.noCommentText}>{t('cigar.ratingOnly')}</Text>
                        </View>
                      )}
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
      </KeyboardAvoidingView>

      <Modal
        visible={showPriceModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPriceModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('cigar.addPrice')}</Text>
            <TextInput
              style={styles.priceInput}
              value={newPrice}
              onChangeText={setNewPrice}
              placeholder={t('cigar.price')}
              keyboardType="decimal-pad"
            />
            <TextInput
              style={styles.storeInput}
              value={storeName}
              onChangeText={setStoreName}
              placeholder={t('cigar.storeName')}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowPriceModal(false);
                  setNewPrice('');
                  setStoreName('');
                }}>
                <Text style={styles.cancelButtonText}>{t('cigar.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={async () => {
                  try {
                    const priceValue = parseFloat(newPrice);
                    if (isNaN(priceValue)) {
                      Alert.alert(t('common.error'), t('cigar.invalidPrice'));
                      return;
                    }
                    await addPrice(priceValue, storeName);
                    setShowPriceModal(false);
                    setNewPrice('');
                    setStoreName('');
                  } catch (error) {
                    Alert.alert(t('common.error'), (error as Error).message);
                  }
                }}>
                <Text style={styles.submitButtonText}>{t('cigar.submit')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
