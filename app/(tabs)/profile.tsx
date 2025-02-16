import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { supabase } from '../../src/lib/supabase';
import { useAuth } from '../../src/providers/AuthProvider';
import { useLanguage } from '../../src/hooks/useLanguage';
import { useTranslation } from '../../src/hooks/useTranslation';
import { profileStyles as styles } from '../../src/styles';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' }
  ];

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Remplacer la logique de rendu conditionnelle
  if (!session) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('profile.title')}</Text>
        </View>

        <View style={styles.authContainer}>
          <Text style={styles.authTitle}>{t('profile.authTitle')}</Text>

          {error && (
            <Text style={styles.errorText}>
              {error.includes('Invalid login') ? t('profile.invalidCredentials') : error}
            </Text>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('profile.email')}</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder={t('profile.emailPlaceholder')}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('profile.password')}</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder={t('profile.passwordPlaceholder')}
              secureTextEntry
              autoComplete="password"
              textContentType="password"
              returnKeyType="go"
              onSubmitEditing={handleSignIn}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.authButton, loading && styles.authButtonDisabled]}
              onPress={handleSignIn}
              disabled={loading}>
              <Text style={styles.authButtonText}>
                {loading ? t('common.loading') : t('profile.signIn')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.authButton, styles.authButtonSecondary, loading && styles.authButtonDisabled]}
              onPress={handleSignUp}
              disabled={loading}>
              <Text style={[styles.authButtonText, styles.authButtonTextSecondary]}>
                {t('profile.signUp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('profile.title')}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.email}>{session?.user?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.settings')}</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>{t('profile.language')}</Text>
            <View style={styles.languageButtons}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageButton,
                    language === lang.code && styles.languageButtonActive
                  ]}
                  onPress={() => setLanguage(lang.code)}
                >
                  <Text style={[
                    styles.languageButtonText,
                    language === lang.code && styles.languageButtonTextActive
                  ]}>
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
            disabled={loading}>
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.signOutButtonText}>
              {loading ? t('profile.signingOut') : t('profile.signOut')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}