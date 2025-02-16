import { View, Text, ScrollView, Image, TouchableOpacity, Pressable, ActivityIndicator, Platform, RefreshControl } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState, useMemo } from 'react';
import { useCigars } from '../../src/hooks/useCigars';
import { useReviews } from '../../src/hooks/useReviews';
import { useTranslation } from '../../src/hooks/useTranslation';
import { useCigarPrices } from '../../src/hooks/useCigarPrices';
import { homeStyles as styles } from '../../src/styles';

type Filter = {
  origin?: string;
  flavor?: string;
  format?: string;
};

export default function HomeScreen() {
  const { t } = useTranslation();
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filter>({});
  const [refreshing, setRefreshing] = useState(false);
  const { cigars, loading, error, refetch } = useCigars();

  const onRefresh = async () => {
    setRefreshing(true);
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await refetch();
    setRefreshing(false);
    if (Platform.OS !== 'web') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const origins = useMemo(() => [...new Set(cigars.map(cigar => cigar.origin))], [cigars]);
  const formats = useMemo(() => [...new Set(cigars.map(cigar => cigar.format))], [cigars]);

  const filteredCigars = useMemo(() => {
    return cigars.filter(cigar => {
      if (activeFilters.origin && cigar.origin !== activeFilters.origin) return false;
      if (activeFilters.format && cigar.format !== activeFilters.format) return false;
      return true;
    });
  }, [cigars, activeFilters]);

  const toggleFilter = (type: keyof Filter, value: string) => {
    setActiveFilters(prev => {
      if (prev[type] === value) {
        const newFilters = { ...prev };
        delete newFilters[type];
        return newFilters;
      }
      return { ...prev, [type]: value };
    });
  };

  // Update the RatingStars component
  const RatingStars = ({ cigarId, cigar }: { cigarId: string; cigar: any }) => {
    const { reviews = [], error: reviewError } = useReviews(cigarId);
    const { prices = [], error: priceError } = useCigarPrices(cigarId);

    const averageRating = useMemo(() => {
      if (!reviews || reviews.length === 0) return 0;
      return Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length);
    }, [reviews]);

    const averagePrice = useMemo(() => {
      if (!prices || prices.length === 0) return null;
      return prices.reduce((sum, price) => sum + price.price, 0) / prices.length;
    }, [prices]);

    return (
      <View style={styles.cardFooter}>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= averageRating ? "star" : "star-outline"}
              size={12}
              color="#DAA520"
            />
          ))}
          <Text style={styles.ratingText}>({reviews?.length || 0})</Text>
        </View>
        {averagePrice && (
          <View style={[styles.priceContainer, styles.priceContainerSpacing]}>
            <Ionicons name="pricetag" size={12} color="#8B4513" />
            <Text style={styles.priceText}>
              {averagePrice.toFixed(2)}€
            </Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#8B4513" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{t('common.error')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>anilla</Text>
        <View style={styles.headerButtons}>
          <Link href="/create-cigar" asChild>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="add-circle-outline" size={28} color="#8B4513" />
            </TouchableOpacity>
          </Link>
          <Link href="/flavors" asChild>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="leaf-outline" size={28} color="#8B4513" />
            </TouchableOpacity>
          </Link>
          <TouchableOpacity
            style={[styles.headerButton, styles.filterButton]}
            onPress={() => setFilterVisible(!filterVisible)}>
            {Object.keys(activeFilters).length > 0 && (
              <View style={styles.filterBadge} />
            )}
            <Ionicons name="filter" size={28} color="#8B4513" />
          </TouchableOpacity>
        </View>
      </View>

      {filterVisible && (
        <View style={styles.filterMenu}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>{t('home.filterAndSort')}</Text>
            {Object.keys(activeFilters).length > 0 && (
              <TouchableOpacity
                style={styles.clearFilters}
                onPress={() => setActiveFilters({})}>
                <Text style={styles.clearFiltersText}>{t('home.clearAll')}</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>{t('home.origin')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterOptions}>
                {origins.map((origin) => (
                  <Pressable
                    key={origin}
                    style={[
                      styles.filterOption,
                      activeFilters.origin === origin && styles.filterOptionActive
                    ]}
                    onPress={() => toggleFilter('origin', origin)}>
                    <Text style={[
                      styles.filterText,
                      activeFilters.origin === origin && styles.filterTextActive
                    ]}>{origin}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>{t('home.format')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterOptions}>
                {formats.map((format) => (
                  <Pressable
                    key={format}
                    style={[
                      styles.filterOption,
                      activeFilters.format === format && styles.filterOptionActive
                    ]}
                    onPress={() => toggleFilter('format', format)}>
                    <Text style={[
                      styles.filterText,
                      activeFilters.format === format && styles.filterTextActive
                    ]}>{format}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      )}

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#CD853F']}
            tintColor="#CD853F"
            progressViewOffset={15}
            progressBackgroundColor="transparent"
            size="default"
            title="Actualisation..."
            titleColor="#8B4513"
          />
        }
      >
        <View style={styles.grid}>
          {filteredCigars.map((cigar) => (
            <Link href={`/cigar/${cigar.id}`} key={cigar.id} asChild>
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}>
                <Image source={{ uri: cigar.image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{cigar.name}</Text>
                  <Text style={styles.cardSubtitle}>{cigar.origin}</Text>
                  <Text style={styles.cardFlavor}>{cigar.flavor}</Text>
                  <View style={styles.cardFooter}>
                    <RatingStars cigarId={cigar.id} cigar={cigar} />
                  </View>
                </View>
                <View style={styles.cardBadges}>
                  {cigar.format === 'Robusto' && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{t('home.popular')}</Text>
                    </View>
                  )}
                  {cigar.origin === 'Cuba' && (
                    <View style={[styles.badge, styles.badgePremium]}>
                      <Text style={styles.badgeText}>{t('home.premium')}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
