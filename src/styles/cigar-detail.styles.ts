import { Platform, StyleSheet } from 'react-native';

export const cigarDetailStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 16,
    textAlign: 'center',
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#DEB887',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#8B4513',
  },
  storeInput: {
    borderWidth: 1,
    borderColor: '#DEB887',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#8B4513',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FDF5E6',
    borderWidth: 1,
    borderColor: '#DEB887',
  },
  submitButton: {
    backgroundColor: '#8B4513',
  },
  cancelButtonText: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addPriceButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addPriceButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  priceStats: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceStatItem: {
    alignItems: 'center',
  },
  priceStatLabel: {
    fontSize: 14,
    color: '#CD853F',
    marginBottom: 4,
  },
  priceStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: 2,
  },
  priceStatSubtext: {
    fontSize: 12,
    color: '#A0522D',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noPricesText: {
    textAlign: 'center',
    color: '#CD853F',
    fontSize: 16,
    marginTop: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#FDF5E6',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#8B4513',
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 60 : 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#CD853F',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 8,
  },
  flavorText: {
    fontSize: 16,
    color: '#A0522D',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#A0522D',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addReviewButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addReviewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  reviewForm: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  reviewInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  reviewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reviewButtonCancel: {
    backgroundColor: '#CD853F',
  },
  reviewButtonDelete: {
    backgroundColor: '#DC3545',
  },
  reviewButtonSubmit: {
    backgroundColor: '#8B4513',
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  reviewsList: {
    gap: 12,
  },
  reviewItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
  },
  ratingDisplay: {
    flexDirection: 'row',
    gap: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#CD853F',
  },
  reviewText: {
    fontSize: 14,
    color: '#A0522D',
    marginTop: 8,
  },
  noReviewsText: {
    textAlign: 'center',
    color: '#CD853F',
    fontSize: 16,
    marginTop: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#DEB887',
  },
  actionButtonActive: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#8B4513',
  },
  actionTextActive: {
    color: '#FFFFFF',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  halfStarButton: {
    padding: 2,
  },
  noCommentContainer: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  noCommentText: {
    color: '#666',
    fontStyle: 'italic',
    fontSize: 12,
  },
  // Ajoutez ces styles à votre fichier de styles existant
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FDF5E6',
    marginTop: 16,
  },
});