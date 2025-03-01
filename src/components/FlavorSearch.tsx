import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LEVEL_1_CATEGORIES, LEVEL_2_CATEGORIES, LEVEL_3_CATEGORIES, LEVEL_4_CATEGORIES } from '../data/simpleFlavorCategories';

interface FlavorSearchProps {
  onSelectFlavor: (path: string[]) => void;
}

interface SearchResult {
  name: string;
  path: string[];
}

export const FlavorSearch: React.FC<FlavorSearchProps> = ({ onSelectFlavor }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const searchFlavors = (text: string) => {
    setQuery(text);

    if (!text.trim()) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const lowerQuery = text.toLowerCase();

    // Recherche dans les catégories de niveau 1
    Object.keys(LEVEL_1_CATEGORIES).forEach(cat1 => {
      if (cat1.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ name: cat1, path: [cat1] });
      }

      // Recherche dans les catégories de niveau 2
      if (LEVEL_2_CATEGORIES[cat1]) {
        Object.keys(LEVEL_2_CATEGORIES[cat1]).forEach(cat2 => {
          if (cat2.toLowerCase().includes(lowerQuery)) {
            searchResults.push({ name: cat2, path: [cat1, cat2] });
          }

          // Recherche dans les catégories de niveau 3
          if (LEVEL_3_CATEGORIES[cat2]) {
            LEVEL_3_CATEGORIES[cat2].forEach(cat3 => {
              if (cat3.toLowerCase().includes(lowerQuery)) {
                searchResults.push({ name: cat3, path: [cat1, cat2, cat3] });
              }
            });
          }
        });
      }
    });

    // Recherche dans les catégories de niveau 4
    Object.keys(LEVEL_4_CATEGORIES).forEach(cat4 => {
      if (cat4.toLowerCase().includes(lowerQuery)) {
        // Trouver le chemin complet pour cette saveur
        let foundPath: string[] = [];

        Object.keys(LEVEL_1_CATEGORIES).forEach(cat1 => {
          if (LEVEL_2_CATEGORIES[cat1]) {
            Object.keys(LEVEL_2_CATEGORIES[cat1]).forEach(cat2 => {
              if (LEVEL_3_CATEGORIES[cat2] && LEVEL_3_CATEGORIES[cat2].includes(cat4)) {
                foundPath = [cat1, cat2, cat4];
              }
            });
          }
        });

        if (foundPath.length > 0) {
          searchResults.push({ name: cat4, path: foundPath });
        }
      }
    });

    setResults(searchResults.slice(0, 10)); // Limiter à 10 résultats
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#8B4513" />
        <TextInput
          style={styles.input}
          placeholder="Rechercher une saveur..."
          value={query}
          onChangeText={searchFlavors}
          placeholderTextColor="#CD853F"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => searchFlavors('')}></TouchableOpacity>