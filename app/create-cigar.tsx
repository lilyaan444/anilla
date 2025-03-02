import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Platform, Alert, Modal, FlatList, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Portal, PortalProvider, PortalHost } from '@gorhom/portal';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../src/lib/supabase';
import { useAuth } from '../src/providers/AuthProvider';
import { ActivityIndicator } from 'react-native';
import { useTranslation } from '../src/hooks/useTranslation';
import { createCigarStyles as styles } from '../src/styles';
import { useCigarData } from '../src/data/cigarData';

export default function CreateCigarScreen() {
  const { t } = useTranslation();
  const { origins, formats, flavorKeywords } = useCigarData();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState('');  // Ajout de l'état uploadProgress
  // In your form state, add price
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    format: '',
    flavor: '',
    description: '',
    price: '', // Add this line
    store_name: '', // Add this line
  });

  const [showOriginPicker, setShowOriginPicker] = useState(false);
  const [showFormatPicker, setShowFormatPicker] = useState(false);
  const [flavorSuggestions, setFlavorSuggestions] = useState([]);
  const [inputPosition, setInputPosition] = useState({ y: 0 });


  const handleFlavorChange = (text) => {
    setFormData(prev => ({ ...prev, flavor: text }));

    // Get the current word being typed (after the last comma)
    const currentWord = text.split(',').pop().trim();

    if (currentWord.length > 0) {
      const suggestions = flavorKeywords.filter(keyword =>
        keyword.toLowerCase().includes(currentWord.toLowerCase()) &&
        !text.toLowerCase().includes(keyword.toLowerCase())
      );
      setFlavorSuggestions(suggestions);
    } else {
      setFlavorSuggestions([]);
    }
  };

  const handleFlavorSuggestionPress = (suggestion) => {
    const flavors = formData.flavor.split(',').map(f => f.trim()).filter(Boolean);
    // Remove the partial word being typed
    flavors.pop();
    // Add the selected suggestion
    flavors.push(suggestion);
    setFormData(prev => ({ ...prev, flavor: flavors.join(', ') + ', ' }));
    setFlavorSuggestions([]);
  };

  if (!session) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{t('createCigar.signInRequired')}</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => router.push('/profile')}>
          <Text style={styles.signInButtonText}>{t('common.signIn')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const pickImage = async () => {
    try {
      // Vérifier les permissions pour iOS
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission requise',
            'Nous avons besoin de votre permission pour accéder à la galerie photos.',
            [{ text: 'OK' }]
          );
          return;
        }
      }

      if (Platform.OS === 'web') {
        // Code existant pour le web...
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
          const file = e.target.files[0];
          if (file) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
              setImage(e.target.result);
            };
            fileReader.readAsDataURL(file);
          }
        };
        input.click();
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [16, 9],
          quality: 0.5,
          maxWidth: 1200,
          maxHeight: 675,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
          setImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert(
        'Erreur',
        'Impossible de sélectionner l\'image. Veuillez réessayer.',
        [{ text: 'OK' }]
      );
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera permissions to take photos');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
        maxWidth: 1200,
        maxHeight: 675,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const resetForm = () => {
      setImage(null);
      setFormData({
        name: '',
        origin: '',
        format: '',
        flavor: '',
        description: '',
      });
      setUploadProgress('');
    };

    const handleSubmit = async () => {

      if (!formData.name || !formData.origin || !formData.format || !formData.flavor || !formData.description) {
        Alert.alert(t('createCigar.error'), t('createCigar.fillAllFields'));
        return;
      }

      setLoading(true);
      setUploadProgress(t('createCigar.preparing'));

      try {
        if (!session?.user) {
          throw new Error('User must be authenticated to upload images');
        }

        let publicUrl = null;

        // Only process image if one was selected
        if (image) {
          setUploadProgress(t('createCigar.processingImage'));

          let fileToUpload;
          if (Platform.OS === 'web') {
            // Gestion spéciale pour le web
            if (image.startsWith('data:')) {
              const base64Data = image.split(',')[1];
              const byteCharacters = atob(base64Data);
              const byteArrays = [];

              for (let i = 0; i < byteCharacters.length; i += 512) {
                const slice = byteCharacters.slice(i, i + 512);
                const byteNumbers = new Array(slice.length);
                for (let j = 0; j < slice.length; j++) {
                  byteNumbers[j] = slice.charCodeAt(j);
                }
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
              }

              fileToUpload = new Blob(byteArrays, { type: 'image/jpeg' });
            } else {
              const response = await fetch(image);
              fileToUpload = await response.blob();
            }
          } else {
            // Pour iOS et Android, utiliser directement l'URI du fichier
            fileToUpload = {
              uri: image,
              name: 'upload.jpg',
              type: 'image/jpeg'
            };
          }

          if (!fileToUpload) {
            throw new Error('Failed to prepare image for upload');
          }

          setUploadProgress(t('createCigar.uploadingImage'));

          const fileName = `${Date.now()}-${formData.name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .trim()}.jpg`;
          const imagePath = `cigars/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('cigar-images')
            .upload(imagePath, fileToUpload, {
              contentType: 'image/jpeg',
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            console.error('Upload error:', uploadError);
            throw new Error(`Upload failed: ${uploadError.message}`);
          }

          const { data: { publicUrl: uploadedUrl } } = supabase.storage
            .from('cigar-images')
            .getPublicUrl(imagePath);

          publicUrl = uploadedUrl;
        }

        // Create cigar with optional image
        const { data: cigarData, error: insertError } = await supabase
          .from('cigars')
          .insert([{
            name: formData.name,
            origin: formData.origin,
            format: formData.format,
            flavor: formData.flavor,
            description: formData.description,
            image: publicUrl, // Will be null if no image was uploaded
            created_by: session.user.id
          }])
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }

        // If price is provided, add it to cigar_prices table
        if (formData.price) {
          const { error: priceError } = await supabase
            .from('cigar_prices')
            .insert({
              cigar_id: cigarData.id,
              user_id: session.user.id,
              price: parseFloat(formData.price),
              store_name: formData.store_name || null
            });

          if (priceError) {
            console.error('Error adding price:', priceError);
            // Continue even if price insertion fails
          }
        }

        // Reset form and redirect
        resetForm();

        // Afficher la confirmation et rediriger
router.replace('/');

      } catch (error) {
        console.error('Error details:', error);
        const errorMessage = Platform.OS === 'web'
          ? alert('Une erreur est survenue lors de la création du cigare.')
          : Alert.alert('Erreur', error.message || 'Une erreur est survenue lors de la création du cigare.');
      } finally {
        setLoading(false);
      }
    };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: '#FDF5E6' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      enabled={Platform.OS === 'ios'}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#8B4513" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('createCigar.title')}</Text>
          <Text style={styles.subtitle}>{t('createCigar.subtitle')}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
        bounces={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.formWrapper}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={48} color="#CD853F" />
                <Text style={styles.imagePlaceholderText}>{t('createCigar.addPhoto')}</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.imageButtons}>
            <TouchableOpacity
              style={[styles.imageButton, styles.galleryButton]}
              onPress={pickImage}>
              <Ionicons name="images-outline" size={24} color="#8B4513" />
              <Text style={styles.imageButtonText}>{t('createCigar.gallery')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.imageButton, styles.cameraButton]}
              onPress={takePhoto}>
              <Ionicons name="camera-outline" size={24} color="#8B4513" />
              <Text style={styles.imageButtonText}>{t('createCigar.camera')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={[styles.inputContainer, { zIndex: 5 }]}>
              <Text style={styles.label}>{t('createCigar.name')}</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                placeholder={t('createCigar.namePlaceholder')}
              />
            </View>

            <View style={[styles.inputContainer, { zIndex: 4 }]}>
              <Text style={styles.label}>{t('createCigar.origin')}</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowOriginPicker(true)}>
                <Text style={formData.origin ? styles.inputText : styles.placeholderText}>
                  {formData.origin || t('createCigar.originPlaceholder')}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.inputContainer, { zIndex: 3 }]}>
              <Text style={styles.label}>{t('createCigar.format')}</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowFormatPicker(true)}>
                <Text style={formData.format ? styles.inputText : styles.placeholderText}>
                  {formData.format || t('createCigar.formatPlaceholder')}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.inputContainer, { zIndex: 2 }]}>
              <Text style={styles.label}>{t('cigar.price')}</Text>
              <TextInput
                style={styles.input}
                value={formData.price}
                onChangeText={(text) => {
                  // Remplacer directement la virgule par un point
                  const sanitizedText = text.replace(',', '.');
                  const numericValue = sanitizedText.replace(/[^0-9.]/g, '');
                  if (numericValue.split('.').length <= 2) {
                    setFormData(prev => ({ ...prev, price: numericValue }));
                  }
                }}
                placeholder={t('cigar.price')}
                keyboardType={Platform.select({
                  ios: 'numbers-and-punctuation',
                  android: 'decimal-pad',
                  default: 'decimal-pad'
                })}
                returnKeyType="done"
              />
            </View>

            <View style={[styles.inputContainer, { zIndex: 2 }]}>
              <Text style={styles.label}>{t('cigar.storeName')}</Text>
              <TextInput
                style={styles.input}
                value={formData.store_name}
                onChangeText={(text) => setFormData(prev => ({ ...prev, store_name: text }))}
                placeholder={t('cigar.storeName')}
              />
            </View>

            <View style={[styles.inputContainer, { zIndex: 2 }]}>
              <Text style={styles.label}>{t('createCigar.flavor')}</Text>
              <TextInput
                style={styles.input}
                value={formData.flavor}
                onChangeText={handleFlavorChange}
                placeholder={t('createCigar.flavorPlaceholder')}
              />
              {flavorSuggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  {flavorSuggestions.map((suggestion) => (
                    <TouchableOpacity
                      key={suggestion}
                      style={styles.suggestionItem}
                      onPress={() => handleFlavorSuggestionPress(suggestion)}>
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={[styles.inputContainer, { zIndex: 1 }]}>
              <Text style={styles.label}>{t('createCigar.description')}</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                placeholder={t('createCigar.descriptionPlaceholder')}
                multiline
                numberOfLines={4}
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={loading}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="#FFFFFF" />
                  <Text style={styles.submitButtonText}>
                    {uploadProgress}
                  </Text>
                </View>
              ) : (
                <Text style={styles.submitButtonText}>
                  {t('createCigar.create')}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showOriginPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowOriginPicker(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionner l'origine</Text>
              <TouchableOpacity onPress={() => setShowOriginPicker(false)}>
                <Ionicons name="close" size={24} color="#8B4513" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {origins.map((origin) => (
                <TouchableOpacity
                  key={origin}
                  style={styles.modalItem}
                  onPress={() => {
                    setFormData(prev => ({ ...prev, origin }));
                    setShowOriginPicker(false);
                  }}>
                  <Text style={[styles.modalItemText, formData.origin === origin && { fontWeight: '600' }]}>
                    {origin}
                  </Text>
                  {formData.origin === origin && (
                    <Ionicons name="checkmark" size={24} color="#8B4513" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showFormatPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFormatPicker(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Format</Text>
              <TouchableOpacity onPress={() => setShowFormatPicker(false)}>
                <Ionicons name="close" size={24} color="#8B4513" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {formats.map((format) => (
                <TouchableOpacity
                  key={format}
                  style={styles.modalItem}
                  onPress={() => {
                    setFormData(prev => ({ ...prev, format }));
                    setShowFormatPicker(false);
                  }}>
                  <Text style={[styles.modalItemText, formData.format === format && { fontWeight: '600' }]}>
                    {format}
                  </Text>
                  {formData.format === format && (
                    <Ionicons name="checkmark" size={24} color="#8B4513" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
    );
}