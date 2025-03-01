import { Platform, StyleSheet } from 'react-native';

export const flavorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF5E6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 40 : 60,
    paddingBottom: 20,
    backgroundColor: '#FDF5E6',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8B4513',
  },
  subtitle: {
    fontSize: 14,
    color: '#CD853F',
    marginTop: 4,
  },
  wheelContainer: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)'
        }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        }
    ),
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 10,
  },
  flavorsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  flavorItem: {
    backgroundColor: '#FDF5E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryTip: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginTop: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
    lineHeight: 20,
  },
  flavorName: {
    color: '#8B4513',
    fontSize: 14,
    fontWeight: '500',
  },
  detailsHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 15,
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)'
        }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        }
    ),
  },
  categoryTitle: {
    fontSize: 24,
    fontFamily: 'Playfair',
    color: '#8B4513',
    marginBottom: 16,
  },
  flavorsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  flavorItem: {
    backgroundColor: '#FDF5E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryTip: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginTop: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
    lineHeight: 20,
  },
  flavorName: {
    color: '#8B4513',
    fontSize: 14,
    fontWeight: '500',
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  modeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#FDF5E6',
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  modeButtonActive: {
    backgroundColor: '#8B4513',
  },
  modeButtonText: {
    color: '#8B4513',
    fontWeight: 'bold',
  },
  modeButtonTextActive: {
    color: '#FDF5E6',
  },
});