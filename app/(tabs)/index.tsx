import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Pressable, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState, useMemo } from 'react';
import { useCigars } from '../../src/hooks/useCigars';
import { useReviews } from '../../src/hooks/useReviews';
import { useTranslation } from '../../src/hooks/useTranslation';

type Filter = {
  origin?: string;
  flavor?: string;
  format?: string;
};

export default function HomeScreen() {
  const { t } = useTranslation();
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filter>({});
  const { cigars, loading, error } = useCigars();

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

  const RatingStars = ({ cigarId }: { cigarId: string }) => {
    const { reviews } = useReviews(cigarId);
    const averageRating = reviews.length > 0
      ? Math.round((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length))
      : 0;

    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= averageRating ? "star" : "star-outline"}
            size={12}
            color="#DAA520"
          />
        ))}
        <Text style={styles.ratingText}>({reviews.length})</Text>
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

      <ScrollView style={styles.content}>
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
                  <RatingStars cigarId={cigar.id} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF5E6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'web' ? 60 : 70,
    paddingBottom: 24,
    backgroundColor: '#FDF5E6',
    borderBottomWidth: 1,
    borderBottomColor: '#DEB887',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#8B4513',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerButton: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
        }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 5,
        }
    ),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 69, 19, 0.1)',
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#A0522D',
    marginBottom: 6,
    fontWeight: '500',
  },
  cardFlavor: {
    fontSize: 13,
    color: '#CD853F',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  badge: {
    backgroundColor: 'rgba(139, 69, 19, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backdropFilter: 'blur(4px)',
  },
  badgePremium: {
    backgroundColor: 'rgba(218, 165, 32, 0.9)',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  filterMenu: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DEB887',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FDF5E6',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#DEB887',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterOptionActive: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  grid: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  content: {
    flex: 1,
  },
  grid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
        }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }
    ),
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#A0522D',
    marginBottom: 4,
  },
  cardFlavor: {
    fontSize: 12,
    color: '#CD853F',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 10,
    color: '#CD853F',
    marginLeft: 4,
  },
  cardBadges: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'column',
    gap: 4,
  },
  badge: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgePremium: {
    backgroundColor: '#DAA520',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  filterMenu: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DEB887',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4513',
  },
  clearFilters: {
    padding: 8,
  },
  clearFiltersText: {
    color: '#CD853F',
    fontSize: 14,
    fontWeight: '500',
  },
  filterSection: {
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A0522D',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FDF5E6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DEB887',
  },
  filterOptionActive: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
  },
  filterText: {
    color: '#8B4513',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
});