import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FlavorBreadcrumbProps {
  path: string[];
  onNavigate: (index: number) => void;
}

export const FlavorBreadcrumb: React.FC<FlavorBreadcrumbProps> = ({ path, onNavigate }) => {
  return (
    <View style={styles.container}>
      {path.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Ionicons name="chevron-forward" size={16} color="#8B4513" style={styles.separator} />
          )}
          <TouchableOpacity
            onPress={() => onNavigate(index)}
            style={[
              styles.breadcrumbItem,
              index === path.length - 1 && styles.currentItem
            ]}
          >
            <Text
              style={[
                styles.breadcrumbText,
                index === path.length - 1 && styles.currentItemText
              ]}
              numberOfLines={1}
            >
              {item}
            </Text>
          </TouchableOpacity>
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FDF5E6',
    borderBottomWidth: 1,
    borderBottomColor: '#DEB887',
    flexWrap: 'wrap',
  },
  breadcrumbItem: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  currentItem: {
    backgroundColor: '#DEB887',
  },
  breadcrumbText: {
    color: '#8B4513',
    fontSize: 14,
  },
  currentItemText: {
    fontWeight: 'bold',
  },
  separator: {
    marginHorizontal: 4,
  },
});