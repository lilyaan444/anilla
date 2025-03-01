import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LEVEL_4_CATEGORIES } from '../data/simpleFlavorCategories';

interface FourthLevelListProps {
  mainCategory: string;
  subCategory: string;
  specificFlavor: string;
  items: string[];
  onBack: () => void;
}


export const FourthLevelList: React.FC<FourthLevelListProps> = ({
  mainCategory,
  subCategory,
  specificFlavor,
  items,
  onBack,
}) => {
  const flavorData = LEVEL_4_CATEGORIES[specificFlavor];
  const pairings = flavorData?.pairings || { beverages: [], foods: [] };
  const variants = flavorData?.variants || [];
  const characteristics = flavorData?.characteristics || "";
  const foundIn = flavorData?.foundIn || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#8B4513" />
          <Text style={styles.flavorText}>{specificFlavor}</Text>
        </TouchableOpacity>
        <Text style={styles.pathText}>{`${mainCategory} > ${subCategory}`}</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Caractéristiques générales */}
        {characteristics && (
          <View style={styles.characteristicsCard}>
            <Text style={styles.sectionTitle}>Caractéristiques</Text>
            <Text style={styles.characteristicsText}>{characteristics}</Text>
          </View>
        )}

        {/* Variantes */}
        <Text style={styles.sectionTitle}>Variantes</Text>
        {variants.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}

        {/* Où le trouver */}
        {foundIn && foundIn.length > 0 && (
          <View style={styles.foundInSection}>
            <Text style={styles.sectionTitle}>Où le trouver</Text>
            {foundIn.map((item, index) => (
              <Text key={`found-${index}`} style={styles.foundInItem}>
                • {item}
              </Text>
            ))}
          </View>
        )}

        {/* Accords recommandés */}
        <View style={styles.pairingSection}>
          <Text style={styles.pairingSectionTitle}>Accords recommandés</Text>

          <View style={styles.pairingCategory}>
            <Text style={styles.pairingCategoryTitle}>
              <Ionicons name="wine" size={20} color="#8B4513" /> Boissons
            </Text>
            {pairings.beverages.map((beverage, index) => (
              <Text key={`beverage-${index}`} style={styles.pairingItem}>
                • {beverage}
              </Text>
            ))}
          </View>

          <View style={styles.pairingCategory}>
            <Text style={styles.pairingCategoryTitle}>
              <Ionicons name="restaurant" size={20} color="#8B4513" /> Nourriture
            </Text>
            {pairings.foods.map((food, index) => (
              <Text key={`food-${index}`} style={styles.pairingItem}>
                • {food}
              </Text>
            ))}
          </View>
        </View>
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
    marginBottom: 8,
  },
  flavorText: {
    marginLeft: 8,
    fontSize: 18,
    color: '#8B4513',
    fontWeight: 'bold',
  },
  pathText: {
    fontSize: 14,
    color: '#A0522D',
    marginLeft: 32,
  },
  scrollView: {
    flex: 1,
    padding: 8,
  },
  characteristicsCard: {
    padding: 16,
    backgroundColor: '#FFF',
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  characteristicsText: {
    fontSize: 14,
    color: '#654321',
    lineHeight: 20,
  },
  itemCard: {
    padding: 16,
    backgroundColor: '#FFF',
    marginHorizontal: 8,
    marginVertical: 4,
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
    fontWeight: 'bold',
  },
  foundInSection: {
    padding: 16,
    backgroundColor: '#FFF',
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  foundInItem: {
    fontSize: 14,
    color: '#654321',
    marginBottom: 4,
    lineHeight: 20,
  },
  pairingSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FFF',
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pairingSectionTitle: {
    fontSize: 18,
    color: '#8B4513',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pairingCategory: {
    marginBottom: 16,
  },
  pairingCategoryTitle: {
    fontSize: 16,
    color: '#A0522D',
    fontWeight: 'bold',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pairingItem: {
    fontSize: 14,
    color: '#654321',
    marginLeft: 8,
    marginBottom: 4,
  },
});