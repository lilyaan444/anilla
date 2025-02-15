import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Platform, Alert, Modal, FlatList, Dimensions } from 'react-native';
import { Portal, PortalProvider, PortalHost } from '@gorhom/portal';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../src/lib/supabase';
import { useAuth } from '../src/providers/AuthProvider';
import { ActivityIndicator } from 'react-native';

export default function CreateCigarScreen() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState('');  // Ajout de l'état uploadProgress
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    format: '',
    flavor: '',
    description: '',
  });

  const [showOriginPicker, setShowOriginPicker] = useState(false);
  const [showFormatPicker, setShowFormatPicker] = useState(false);
  const [flavorSuggestions, setFlavorSuggestions] = useState([]);
  const [inputPosition, setInputPosition] = useState({ y: 0 });

  const origins = [
    'Cuba',
    'Dominican Republic',
    'Nicaragua',
    'Honduras',
    'Mexico',
    'Brazil',
    'Costa Rica',
    'Ecuador',
  ];

  // Modification des textes statiques
  const formats = [
    'Robusto',
    'Corona',
    'Churchill',
    'Toro',
    'Gordo',
    'Lancero',
    'Petit Corona',
    'Double Corona',
  ];

  const flavorKeywords = [
    'Terreux',
    'Boisé',
    'Épicé',
    'Sucré',
    'Crémeux',
    'Noix',
    'Cuir',
    'Café',
    'Chocolat',
    'Cèdre',
    'Poivre',
    'Vanille',
    'Floral',
    'Agrumes',
    'Caramel',
  ];

  const handleFlavorChange = (text) => {
    setFormData(prev => ({ ...prev, flavor: text }));
    if (text.length > 0) {
      const suggestions = flavorKeywords.filter(keyword =>
        keyword.toLowerCase().includes(text.toLowerCase())
      );
      setFlavorSuggestions(suggestions);
    } else {
      setFlavorSuggestions([]);
    }
  };

  const handleFlavorSuggestionPress = (suggestion) => {
    const currentFlavors = formData.flavor.split(',').map(f => f.trim()).filter(Boolean);
    const newFlavors = [...new Set([...currentFlavors, suggestion])];
    setFormData(prev => ({ ...prev, flavor: newFlavors.join(', ') }));
    setFlavorSuggestions([]);
  };

  if (!session) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Please sign in to create a cigar</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => router.push('/profile')}>
          <Text style={styles.signInButtonText}>Sign In</Text>
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
        mediaTypes: [ImagePicker.MediaType.Images],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
        maxWidth: 1200,
        maxHeight: 675,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
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
      if (!image) {
        Alert.alert('Error', 'Please add an image');
        return;
      }

      if (!formData.name || !formData.origin || !formData.format || !formData.flavor || !formData.description) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      setLoading(true);
      setUploadProgress('Préparation de l\'image...');

      try {
        if (!session?.user) {
          throw new Error('User must be authenticated to upload images');
        }

        setUploadProgress('Traitement de l\'image...');

        let blob;
        if (Platform.OS === 'web' && image.startsWith('data:')) {
          // Gestion spéciale pour les images base64 sur le web
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

          blob = new Blob(byteArrays, { type: 'image/jpeg' });
        } else {
          const response = await fetch(image);
          if (!response.ok) {
            throw new Error('Failed to fetch image data');
          }
          blob = await response.blob();
        }

        if (!blob) {
          throw new Error('Failed to create image blob');
        }

        setUploadProgress('Upload de l\'image...');

        // Vérifier la taille du blob
        if (blob.size > 5000000) { // 5MB limit
          throw new Error('Image size too large. Please choose a smaller image.');
        }

        // Créer un nom de fichier sécurisé
        const fileName = formData.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .trim();
        const imagePath = `cigars/${Date.now()}-${fileName}`;

        // Upload avec type MIME explicite
        const { error: uploadError } = await supabase.storage
          .from('cigar-images')
          .upload(imagePath, blob, {
            contentType: 'image/jpeg',
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        // Récupérer l'URL publique
        const { data: { publicUrl } } = supabase.storage
          .from('cigar-images')
          .getPublicUrl(imagePath);

        // Créer l'enregistrement dans la base de données
        const { error: insertError } = await supabase
          .from('cigars')
          .insert([{
            ...formData,
            image: publicUrl,
            created_by: session.user.id
          }]);

        if (insertError) {
          throw insertError;
        }

        // Réinitialiser le formulaire
        resetForm();

        // Afficher la confirmation et rediriger
        if (Platform.OS === 'web') {
          alert('Cigare créé avec succès !');
          router.back();
        } else {
          Alert.alert(
            'Succès !',
            'Votre cigare a été créé avec succès.',
            [{
              text: 'OK',
              onPress: () => router.back()
            }]
          );
        }

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#8B4513" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Nouveau Cigare</Text>
          <Text style={styles.subtitle}>Ajoutez votre cigare préféré</Text>
        </View>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.formWrapper}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={48} color="#CD853F" />
                <Text style={styles.imagePlaceholderText}>Ajouter une photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.imageButtons}>
            <TouchableOpacity
              style={[styles.imageButton, styles.galleryButton]}
              onPress={pickImage}>
              <Ionicons name="images-outline" size={24} color="#8B4513" />
              <Text style={styles.imageButtonText}>Galerie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.imageButton, styles.cameraButton]}
              onPress={takePhoto}>
              <Ionicons name="camera-outline" size={24} color="#8B4513" />
              <Text style={styles.imageButtonText}>Appareil photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={[styles.inputContainer, { zIndex: 5 }]}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                placeholder="Entrez le nom du cigare"
              />
            </View>

            <View style={[styles.inputContainer, { zIndex: 4 }]}>
              <Text style={styles.label}>Origine</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowOriginPicker(true)}>
                <Text style={formData.origin ? styles.inputText : styles.placeholderText}>
                  {formData.origin || 'Sélectionnez le pays d\'origine'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.inputContainer, { zIndex: 3 }]}>
              <Text style={styles.label}>Format</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowFormatPicker(true)}>
                <Text style={formData.format ? styles.inputText : styles.placeholderText}>
                  {formData.format || 'Select cigar format'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.inputContainer, { zIndex: 2 }]}>
              <Text style={styles.label}>Flavor Profile</Text>
              <TextInput
                style={styles.input}
                value={formData.flavor}
                onChangeText={handleFlavorChange}
                placeholder="Enter or select flavors"
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
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                placeholder="Enter detailed description"
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
                  Créer le cigare
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
    </View>
    );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DEB887',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4513',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  modalItemText: {
    fontSize: 16,
    color: '#8B4513',
  },
  container: {
    flex: 1,
    backgroundColor: '#FDF5E6',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    fontSize: Platform.OS === 'web' ? 28 : 24,
    fontWeight: '700',
    color: '#8B4513',
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    color: '#CD853F',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
        }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }
    ),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 8,
    fontSize: 16,
    color: '#CD853F',
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DEB887',
    gap: 8,
  },
  imageButtonText: {
    color: '#8B4513',
    fontSize: 14,
    fontWeight: '500',
  },
  formWrapper: {
    position: 'relative',
    zIndex: 1,
  },
  form: {
    gap: 16,
    position: 'relative',
  },
  inputContainer: {
    gap: 8,
    position: 'relative',
    overflow: 'visible',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B4513',
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
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#8B4513',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    minHeight: 56,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#8B4513',
    marginBottom: 16,
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: Platform.OS === 'web' ? 80 : 100,
    zIndex: 1001,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: 'blur(4px)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    maxHeight: '80%',
    elevation: 25,
    position: 'relative',
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px -4px 16px rgba(0, 0, 0, 0.2)'
        }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
        }
    ),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DEB887',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4513',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DEB887',
  },
  modalItemText: {
    fontSize: 16,
    color: '#8B4513',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DEB887',
    marginTop: 4,
    maxHeight: 150, // Limiter la hauteur maximale
    zIndex: 1000,
    elevation: 5,
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
        }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }
    ),
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DEB887',
  },
  suggestionText: {
    fontSize: 14,
    color: '#8B4513',
  },
  inputText: {
    fontSize: 16,
    color: '#8B4513',
  },
  placeholderText: {
    fontSize: 16,
    color: '#CD853F',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});