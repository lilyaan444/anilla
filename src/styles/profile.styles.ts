import { StyleSheet } from 'react-native';

// Add these new styles to your existing profileStyles
export const profileStyles = StyleSheet.create({
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
  authContainer: {
    padding: 20,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 20,
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#8B4513',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEB887',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#8B4513',
  },
  buttonContainer: {
    gap: 12,
  },
  authButton: {
    backgroundColor: '#8B4513',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  authButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  authButtonDisabled: {
    opacity: 0.5,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  authButtonTextSecondary: {
    color: '#8B4513',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#DEB887',
  },
  email: {
    fontSize: 18,
    color: '#8B4513',
  },
  section: {
    padding: 20,
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#8B4513',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FDF5E6',
  },
  buttonIcon: {
    marginRight: 8,
  },
  signOutButton: {
    backgroundColor: '#8B4513',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signOutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 16,
  },
  settingItem: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: '#8B4513',
    marginBottom: 8,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  languageButtonActive: {
    backgroundColor: '#8B4513',
  },
  languageButtonText: {
    color: '#8B4513',
    fontSize: 14,
    fontWeight: '500',
  },
  languageButtonTextActive: {
    color: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    right: 20,
    top: 60,
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    color: '#8B4513',
    marginTop: 8,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  editProfileForm: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  editInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DEB887',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cancelButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8B4513',
    flex: 1,
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#8B4513',
    textAlign: 'center',
    fontWeight: '600',
  },
  saveButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#8B4513',
    flex: 1,
    marginLeft: 8,
  },
  saveButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  statsSection: {
    padding: 20,
    backgroundColor: '#FFF',
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8B4513',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4513',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  // Styles pour les onglets
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#F5E6D3',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#8B4513',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B4513',
  },
  activeTabText: {
    color: '#FFFFFF',
  },

  // Styles pour les avis
  reviewsSection: {
    padding: 20,
    marginTop: 10,
  },
  reviewItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  reviewContent: {
    flex: 1,
  },
  reviewCigarName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 2,
  },
  reviewBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },

  // Styles pour les cigares
  cigarsSection: {
    padding: 20,
    marginTop: 10,
  },
  cigarItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cigarImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  cigarContent: {
    flex: 1,
  },
  cigarName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 2,
  },
  cigarBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cigarOrigin: {
    fontSize: 14,
    color: '#8B4513',
    marginBottom: 4,
  },
  cigarDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },

  // Section amis
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
notificationBadge: {
  position: 'relative',
},
badgeCount: {
  position: 'absolute',
  top: -5,
  right: -5,
  backgroundColor: '#FF6B6B',
  borderRadius: 10,
  width: 20,
  height: 20,
  justifyContent: 'center',
  alignItems: 'center',
},
badgeText: {
  color: '#FFF',
  fontSize: 12,
  fontWeight: 'bold',
},
friendsList: {
  marginBottom: 20,
},
friendItem: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFF',
  borderRadius: 10,
  padding: 12,
  marginBottom: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},
friendAvatar: {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: 15,
},
friendName: {
  flex: 1,
  fontSize: 16,
  fontWeight: '500',
  color: '#333',
},
viewProfileButton: {
  backgroundColor: '#8B4513',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 15,
},
viewProfileText: {
  color: '#FFF',
  fontSize: 12,
  fontWeight: '500',
},
emptyStateText: {
  textAlign: 'center',
  color: '#888',
  fontSize: 16,
  marginVertical: 20,
},
pendingRequests: {
  marginBottom: 20,
},
pendingTitle: {
  fontSize: 18,
  fontWeight: '600',
  color: '#333',
  marginBottom: 10,
},
requestItem: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFF',
  borderRadius: 10,
  padding: 12,
  marginBottom: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},
requestActions: {
  flexDirection: 'row',
},
acceptButton: {
  backgroundColor: '#4CAF50',
  width: 36,
  height: 36,
  borderRadius: 18,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 8,
},
rejectButton: {
  backgroundColor: '#F44336',
  width: 36,
  height: 36,
  borderRadius: 18,
  justifyContent: 'center',
  alignItems: 'center',
},
findFriends: {
  marginBottom: 20,
},
findFriendsTitle: {
  fontSize: 18,
  fontWeight: '600',
  color: '#333',
  marginBottom: 10,
},
searchInput: {
  backgroundColor: '#FFF',
  borderRadius: 10,
  padding: 12,
  fontSize: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},
settingsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  settingsSection: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  languageOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  languageOption: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  activeLanguageOption: {
    backgroundColor: '#8B4513',
  },
  languageText: {
    color: '#666',
  },
  activeLanguageText: {
    color: '#FFF',
  },
  signOutContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});