import { View, Text, ScrollView, Image, TouchableOpacity, Pressable, ActivityIndicator, Platform, RefreshControl } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState, useMemo, useEffect } from 'react';
import { useCigars } from '../../src/hooks/useCigars';
import { useReviews } from '../../src/hooks/useReviews';
import { useTranslation } from '../../src/hooks/useTranslation';
import { useCigarPrices } from '../../src/hooks/useCigarPrices';
import { homeStyles as styles } from '../../src/styles';
import { supabase } from '../../src/lib/supabase'; // Add this import
import { LinearGradient } from 'expo-linear-gradient';

type Filter = {
  origin?: string;
  flavor?: string;
  format?: string;
  sort?: 'cheaper' | 'expensive' | 'bestValue';
};

export default function HomeScreen() {
  const { t } = useTranslation();
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filter>({});
  const [refreshing, setRefreshing] = useState(false);
  const { cigars, loading, error, refetch } = useCigars();
  const [cigarData, setCigarData] = useState<{[key: string]: {avgPrice: number, avgRating: number, priceCount: number, reviewCount: number}}>({});

  // Fetch all prices and reviews for sorting
  useEffect(() => {
    const fetchCigarData = async () => {
      const data: {[key: string]: {avgPrice: number, avgRating: number, priceCount: number, reviewCount: number}} = {};

      for (const cigar of cigars) {
        try {
          const { data: reviews } = await supabase
            .from('reviews')
            .select('*')
            .eq('cigar_id', cigar.id);

          const { data: prices } = await supabase
            .from('cigar_prices')
            .select('*')
            .eq('cigar_id', cigar.id);

          const avgRating = reviews && reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

          const avgPrice = prices && prices.length > 0
            ? prices.reduce((sum, p) => sum + p.price, 0) / prices.length
            : Infinity;

          data[cigar.id] = {
            avgPrice,
            avgRating,
            priceCount: prices ? prices.length : 0,
            reviewCount: reviews ? reviews.length : 0
          };
        } catch (err) {
          console.error(`Error fetching data for cigar ${cigar.id}:`, err);
        }
      }

      setCigarData(data);
    };

    if (cigars.length > 0) {
      fetchCigarData();
    }
  }, [cigars]);

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

  const sortedAndFilteredCigars = useMemo(() => {
    let filtered = cigars.filter(cigar => {
      if (activeFilters.origin && cigar.origin !== activeFilters.origin) return false;
      if (activeFilters.format && cigar.format !== activeFilters.format) return false;
      return true;
    });

    if (activeFilters.sort && Object.keys(cigarData).length > 0) {
      filtered = [...filtered].sort((a, b) => {
        const dataA = cigarData[a.id] || { avgPrice: Infinity, avgRating: 0, priceCount: 0, reviewCount: 0 };
        const dataB = cigarData[b.id] || { avgPrice: Infinity, avgRating: 0, priceCount: 0, reviewCount: 0 };

        switch (activeFilters.sort) {
          case 'cheaper':
            // Tri par prix (du moins cher au plus cher)
            if (dataA.avgPrice === Infinity && dataB.avgPrice === Infinity) return 0;
            if (dataA.avgPrice === Infinity) return 1;
            if (dataB.avgPrice === Infinity) return -1;
            return dataA.avgPrice - dataB.avgPrice;
          case 'expensive':
            // Tri par prix (du plus cher au moins cher)
            if (dataA.avgPrice === Infinity && dataB.avgPrice === Infinity) return 0;
            if (dataA.avgPrice === Infinity) return 1;
            if (dataB.avgPrice === Infinity) return -1;
            return dataB.avgPrice - dataA.avgPrice;
          case 'bestValue':
            // Tri par rapport qualité/prix (du meilleur au pire)
            const valueA = dataA.avgPrice === Infinity ? 0 : dataA.avgRating / dataA.avgPrice;
            const valueB = dataB.avgPrice === Infinity ? 0 : dataB.avgRating / dataB.avgPrice;
            return valueB - valueA;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [cigars, activeFilters, cigarData]);

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
      const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      return Math.round(avg * 2) / 2; // Round to nearest 0.5
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
              name={
                averageRating >= star
                  ? "star"
                  : averageRating >= star - 0.5
                  ? "star-half"
                  : "star-outline"
              }
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

  // Add this function to render the cigar image or a placeholder with varying gradients
  const renderCigarImage = (cigar) => {
    if (cigar.image) {
      return (
        <Image source={{ uri: cigar.image }} style={styles.cardImage} />
      );
    } else {
      // Generate gradient colors based on cigar properties for variety
      const gradientColors = getGradientColorsForCigar(cigar);

      return (
        <LinearGradient
          colors={gradientColors}
          style={[styles.cardImage, styles.placeholderImage]}
        >
          <Ionicons name="leaf-outline" size={40} color="#FDF5E6" />
          <Text style={styles.placeholderText}>{cigar.name.charAt(0).toUpperCase()}</Text>
        </LinearGradient>
      );
    }
  };

  // Function to generate different gradient colors based on cigar properties
  const getGradientColorsForCigar = (cigar) => {
    // Use different color schemes based on origin or format
    const colorSchemes = {
      'Cuba': ['#B22222', '#8B0000', '#800000'],
      'Nicaragua': ['#228B22', '#006400', '#004d00'],
      'Dominican Republic': ['#4682B4', '#1E90FF', '#00008B'],
      'Honduras': ['#FF8C00', '#FF4500', '#8B4513'],
      'Mexico': ['#9932CC', '#8B008B', '#4B0082'],
      'Brazil': ['#2E8B57', '#3CB371', '#006400'],
      'default': ['#DEB887', '#CD853F', '#8B4513']
    };

    // Get colors based on origin, or use default if origin not in our schemes
    const colors = colorSchemes[cigar.origin] || colorSchemes.default;

    // Add some randomness to make each cigar unique
    if (cigar.id) {
      // Use the cigar ID to create some deterministic variation
      const idSum = cigar.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

      // Slightly adjust the middle color based on the ID
      if (idSum % 3 === 0) {
        // Swap first and last colors
        return [colors[2], colors[1], colors[0]];
      } else if (idSum % 3 === 1) {
        // Use original order
        return colors;
      } else {
        // Use a different variation
        return [colors[1], colors[0], colors[2]];
      }
    }

    return colors;
  };

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

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>{t('home.sort')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterOptions}>
                <Pressable
                  style={[
                    styles.filterOption,
                    activeFilters.sort === 'cheaper' && styles.filterOptionActive
                  ]}
                  onPress={() => toggleFilter('sort', 'cheaper')}>
                  <Text style={[
                    styles.filterText,
                    activeFilters.sort === 'cheaper' && styles.filterTextActive
                  ]}>{t('home.cheaper')}</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.filterOption,
                    activeFilters.sort === 'expensive' && styles.filterOptionActive
                  ]}
                  onPress={() => toggleFilter('sort', 'expensive')}>
                  <Text style={[
                    styles.filterText,
                    activeFilters.sort === 'expensive' && styles.filterTextActive
                  ]}>{t('home.expensive')}</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.filterOption,
                    activeFilters.sort === 'bestValue' && styles.filterOptionActive
                  ]}
                  onPress={() => toggleFilter('sort', 'bestValue')}>
                  <Text style={[
                    styles.filterText,
                    activeFilters.sort === 'bestValue' && styles.filterTextActive
                  ]}>{t('home.bestValue')}</Text>
                </Pressable>
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
          {sortedAndFilteredCigars.map((cigar) => (
            <Link href={`/cigar/${cigar.id}`} key={cigar.id} asChild>
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}>
                {renderCigarImage(cigar)}
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