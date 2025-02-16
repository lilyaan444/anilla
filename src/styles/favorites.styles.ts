import { StyleSheet } from 'react-native';

export const favoritesStyles = StyleSheet.create({
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