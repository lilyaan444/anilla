import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Link } from 'expo-router';
import { useCigars } from '../../src/hooks/useCigars';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { cigars, loading, error } = useCigars(searchQuery);

  const renderItem = ({ item: cigar }) => (
    <Link href={`/cigar/${cigar.id}`} asChild>
      <TouchableOpacity style={styles.resultItem}>
        <Image source={{ uri: cigar.image }} style={styles.resultImage} />
        <View style={styles.resultContent}>
          <Text style={styles.resultTitle}>{cigar.name}</Text>
          <Text style={styles.resultSubtitle}>{cigar.origin}</Text>
          <Text style={styles.resultFlavor}>{cigar.flavor}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8B4513" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search cigars..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#CD853F"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#8B4513" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={cigars}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              {loading ? (
                <Text style={styles.emptyStateText}>Loading...</Text>
              ) : searchQuery.length > 0 ? (
                <>
                  <Ionicons name="search" size={48} color="#CD853F" />
                  <Text style={styles.emptyStateText}>No cigars found</Text>
                </>
              ) : (
                <>
                  <Ionicons name="search" size={48} color="#CD853F" />
                  <Text style={styles.emptyStateText}>Search for cigars</Text>
                </>
              )}
            </View>
          )}
        />
      )}
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#8B4513',
  },
  resultsList: {
    padding: 16,
  },
  resultItem: {
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
  resultImage: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  resultContent: {
    flex: 1,
    padding: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#A0522D',
    marginBottom: 4,
  },
  resultFlavor: {
    fontSize: 12,
    color: '#CD853F',
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
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 16,
    textAlign: 'center',
  },
});