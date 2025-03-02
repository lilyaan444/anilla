import { Platform, StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
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
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }
    ),
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
    gap: 8,
  },
  headerButton: {
    padding: Platform.OS === 'web' ? 8 : 6,
    borderRadius: 10,
  },
  content: {
    flex: 1,
  },
  grid: {
    padding: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  card: {
    width: Platform.OS === 'web' ? '48%' : '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px 8px 24px rgba(139, 69, 19, 0.12)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          ':hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 32px rgba(139, 69, 19, 0.18)'
          }
        }
      : {
          shadowColor: '#8B4513',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4,
        }
    ),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 69, 19, 0.08)',
  },
  cardImage: {
    width: '100%',
    height: Platform.OS === 'web' ? 200 : 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: Platform.OS === 'web' ? 16 : 12,
    gap: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B4513',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: -0.5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#A0522D',
    fontWeight: '500',
    opacity: 0.9,
  },
  cardFlavor: {
    fontSize: 12,
    color: '#CD853F',
    fontStyle: 'italic',
    opacity: 0.8,
  },
  cardFooter: {
    flexDirection: 'column',
    gap: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(218, 165, 32, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    flex: 1,
    minWidth: 80,
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontSize: 10,
    color: '#DAA520',
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 69, 19, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  priceContainerSpacing: {
    marginTop: 4,
  },
  priceText: {
    fontSize: 12,
    color: '#8B4513',
    fontWeight: '600',
    marginLeft: 4,
  },
  cardBadges: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'column',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(139, 69, 19, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backdropFilter: 'blur(8px)',
  },
  badgePremium: {
    backgroundColor: 'rgba(218, 165, 32, 0.9)',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  filterMenu: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DEB887',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }
    ),
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
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        }
    ),
  },
  filterOptionActive: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 2px 4px rgba(139, 69, 19, 0.2)' }
      : {
          shadowColor: '#8B4513',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
        }
    ),
  },
  filterText: {
    color: '#8B4513',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 16,
    textAlign: 'center',
  },
  filterBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B4513',
  },
  // Ajoutez ces styles à votre fichier de styles existant
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEB887',
  },
  placeholderText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FDF5E6',
    marginTop: 8,
  },
});