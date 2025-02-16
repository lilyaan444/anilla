import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { useCigars } from '../../src/hooks/useCigars';
import { useTranslation } from '../../src/hooks/useTranslation';
import { searchStyles as styles } from '../../src/styles';

export default function SearchScreen() {
  const { t } = useTranslation();
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
            placeholder={t('search.placeholder')}
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
          <Text style={styles.errorText}>{t('common.error')}</Text>
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
                <Text style={styles.emptyStateText}>{t('common.loading')}</Text>
              ) : searchQuery.length > 0 ? (
                <>
                  <Ionicons name="search" size={48} color="#CD853F" />
                  <Text style={styles.emptyStateText}>{t('search.noResults')}</Text>
                  <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => router.push('/create-cigar')}
                  >
                    <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
                    <Text style={styles.createButtonText}>{t('search.createCigar')}</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Ionicons name="search" size={48} color="#CD853F" />
                  <Text style={styles.emptyStateText}>{t('search.startSearching')}</Text>
                </>
              )}
            </View>
          )}
          onScroll={() => {}}
          scrollEventThrottle={16}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      )}
    </View>
  );
}