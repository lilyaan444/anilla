import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ThirdLevelListProps {
  mainCategory: string;
  subCategory: string;
  items: string[];
  onItemPress: (item: string) => void;
  onBack: () => void;
}

export const ThirdLevelList: React.FC<ThirdLevelListProps> = ({
  mainCategory,
  subCategory,
  items,
  onItemPress,
  onBack,
}) => {
  // S'assurer que items est un tableau
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#8B4513" />
          <Text style={styles.categoryText}>{subCategory}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {safeItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemCard}
            onPress={() => onItemPress(item)}
          >
            <Text style={styles.itemText}>{item}</Text>
            <Ionicons name="chevron-forward" size={20} color="#8B4513" />
          </TouchableOpacity>
        ))}

        {safeItems.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun élément disponible</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF5E6',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DEB887',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 18,
    color: '#8B4513',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 16,
    color: '#654321',
  },
  // Nouveaux styles pour l'état vide
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#8B4513',
    fontStyle: 'italic',
  },
});