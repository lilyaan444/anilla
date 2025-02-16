import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavoritesStore } from '../../src/store/favorites';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { useCigars } from '../../src/hooks/useCigars';
import { useTranslation } from '../../src/hooks/useTranslation';
import { favoritesStyles as styles } from '../../src/styles';

export default function FavoritesScreen() {
  const { t } = useTranslation();
  const { favorites, fetchFavorites, removeFavorite, loading: favoritesLoading } = useFavoritesStore();
  const { cigars, loading: cigarsLoading } = useCigars();

  const favoriteCigars = cigars.filter(cigar => favorites.includes(cigar.id));

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (cigarId: string) => {
    try {
      await removeFavorite(cigarId);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const loading = favoritesLoading || cigarsLoading;

  const renderItem = ({ item: cigar }) => (
    <View style={styles.favoriteItem}>
      <Link href={`/cigar/${cigar.id}`} asChild>
        <TouchableOpacity style={styles.favoriteContent}>
          <Image source={{ uri: cigar.image }} style={styles.favoriteImage} />
          <View style={styles.favoriteInfo}>
            <Text style={styles.favoriteTitle}>{cigar.name}</Text>
            <Text style={styles.favoriteSubtitle}>{cigar.origin}</Text>
            <Text style={styles.favoriteFlavor}>{cigar.flavor}</Text>
          </View>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFavorite(cigar.id)}>
        <Ionicons name="heart" size={24} color="#8B4513" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('favorites.title')}</Text>
      </View>

      <FlatList
        data={favoriteCigars}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.favoritesList}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            {loading ? (
              <Text style={styles.emptyStateText}>{t('common.loading')}</Text>
            ) : (
              <>
                <Ionicons name="heart-outline" size={48} color="#CD853F" />
                <Text style={styles.emptyStateText}>{t('favorites.noFavorites')}</Text>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}