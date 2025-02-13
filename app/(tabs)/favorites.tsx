import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavoritesStore } from '../../src/store/favorites';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { useCigars } from '../../src/hooks/useCigars';

export default function FavoritesScreen() {
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
        <Text style={styles.title}>Favorites</Text>
      </View>

      <FlatList
        data={favoriteCigars}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.favoritesList}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            {loading ? (
              <Text style={styles.emptyStateText}>Loading...</Text>
            ) : (
              <>
                <Ionicons name="heart-outline" size={48} color="#CD853F" />
                <Text style={styles.emptyStateText}>No favorites yet</Text>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF5E6',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FDF5E6',
    borderBottomWidth: 1,
    borderBottomColor: '#DEB887',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#8B4513',
  },
  favoritesList: {
    padding: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteContent: {
    flex: 1,
    flexDirection: 'row',
  },
  favoriteImage: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  favoriteInfo: {
    flex: 1,
    padding: 12,
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 4,
  },
  favoriteSubtitle: {
    fontSize: 14,
    color: '#A0522D',
    marginBottom: 4,
  },
  favoriteFlavor: {
    fontSize: 12,
    color: '#CD853F',
  },
  removeButton: {
    padding: 12,
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 16,
    color: '#CD853F',
  },
});