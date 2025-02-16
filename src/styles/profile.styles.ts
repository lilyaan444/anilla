import { StyleSheet } from 'react-native';

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
});