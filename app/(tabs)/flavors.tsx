import { View, Text, Dimensions, Platform } from 'react-native';
import { useState, useCallback, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  runOnJS,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import * as d3Shape from 'd3-shape';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../../src/data/flavorCategories';
import FlavorDetailModal from '../../src/components/FlavorDetailModal';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as Haptics from 'expo-haptics';
import { flavorStyles as styles } from '../../src/styles';
import { useTranslation } from '../../src/hooks/useTranslation';
import { SimpleFlavorWheel } from '../../src/components/SimpleFlavorWheel';
import { ComplexFlavorWheel } from '../../src/components/ComplexFlavorWheel';
import { FlavorItem } from '../../src/types/flavor';
import { SecondLevelWheel } from '../../src/components/SecondLevelWheel';
import { ThirdLevelList } from '../../src/components/ThirdLevelList';
import { FourthLevelList } from '../../src/components/FourthLevelList';
import { LEVEL_2_CATEGORIES, LEVEL_4_CATEGORIES } from '../../src/data/simpleFlavorCategories';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.85;
const WHEEL_CENTER = WHEEL_SIZE / 2;

export default function FlavorWheel() {
  const { t } = useTranslation();
  const [fontsLoaded] = useFonts({
    'Playfair': require('../../assets/fonts/PlayfairDisplay-Bold.ttf'),
  });

  // State management
  const [wheelMode, setWheelMode] = useState<'simple' | 'complex'>('simple');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<FlavorItem | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedSpecificFlavor, setSelectedSpecificFlavor] = useState<string | null>(null);


  // Animation values
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);
  const detailsPanelY = useSharedValue(0);

  // D3 configurations
  const createPie = d3Shape.pie().value(() => 1).sort(null);
  const createArc = d3Shape
    .arc()
    .outerRadius(WHEEL_SIZE / 2)
    .innerRadius(WHEEL_SIZE / 4 - 10)
    .padAngle(0.02)
    .cornerRadius(6);

  // Animation styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
    opacity: opacity.value,
  }));

  const detailsPanelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: detailsPanelY.value }]
  }));

  // Handlers
  const showFlavorDetail = useCallback((flavor: FlavorItem) => {
    setSelectedFlavor(flavor);
  }, []);

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      detailsPanelY.value = 0;
    },
    onActive: (event) => {
      if (event.translationY > 0) {
        detailsPanelY.value = event.translationY;
      }
    },
    onEnd: (event) => {
      if (event.translationY > 100) {
        detailsPanelY.value = withSpring(400, {}, (finished) => {
          if (finished) {
            runOnJS(setSelectedCategory)(null);
            detailsPanelY.value = 0;
          }
        });
      } else {
        detailsPanelY.value = withSpring(0);
      }
    },
  });

  // Ajouter cette fonction pour les transitions fluides entre niveaux
  const transitionToLevel = (level: number, category: string | null = null) => {
    // Effet de zoom et rotation lors du changement de niveau
    scale.value = withSpring(0.9, { damping: 10 });
    opacity.value = withTiming(0.7, { duration: 200 }, () => {
      // Après la transition de sortie, mettre à jour le niveau
      runOnJS(setCurrentLevel)(level);
      if (category !== undefined) {
        if (level === 1) {
          runOnJS(setSelectedMainCategory)(null);
        } else if (level === 2) {
          runOnJS(setSelectedMainCategory)(category);
        }
      }

      // Transition d'entrée
      scale.value = withSpring(1, { damping: 12 });
      opacity.value = withTiming(1, { duration: 300 });
    });
  };

  // Mettre à jour le gestionnaire de catégorie principale
  const handleMainCategoryPress = useCallback((category: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    if (selectedMainCategory === category) {
      // Si on clique sur la même catégorie, on reste au niveau 1
      setSelectedMainCategory(null);
    } else {
      // Animation de transition vers le niveau 2
      animateWheelSelection();
      setSelectedMainCategory(category);
      setCurrentLevel(2);
    }
  }, [selectedMainCategory]);

  const triggerHapticFeedback = () => {
    const rotationDuration = 500;
    const vibrationInterval = 80;
    const numVibrations = 4;
    let vibrationCount = 0;

    const intervalId = setInterval(() => {
      if (vibrationCount < numVibrations) {
        Haptics.impactAsync(
          vibrationCount === numVibrations - 1
            ? Haptics.ImpactFeedbackStyle.Medium
            : Haptics.ImpactFeedbackStyle.Light
        );
        vibrationCount++;
      } else {
        clearInterval(intervalId);
      }
    }, vibrationInterval);
  };

  const animateWheelSelection = () => {
    scale.value = withSpring(1.1, { damping: 2, stiffness: 100 });
    rotation.value = withTiming(rotation.value + 360, { duration: 600 });
    opacity.value = withTiming(0.6, { duration: 200 }, () => {
      opacity.value = withTiming(1, { duration: 200 });
    });
  };

  // Render methods
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#8B4513" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('flavorswheel.wheelTitle')}</Text>
        <Text style={styles.subtitle}>{t('flavorswheel.wheelSubtitle')}</Text>
      </View>
    </View>
  );

  const renderModeSelector = () => (
    <View style={styles.modeSelector}>
      <TouchableOpacity
        style={[
          styles.modeButton,
          wheelMode === 'simple' && styles.modeButtonActive
        ]}
        onPress={() => setWheelMode('simple')}>
        <Text style={[
          styles.modeButtonText,
          wheelMode === 'simple' && styles.modeButtonTextActive
        ]}>{t('flavorswheel.simpleMode')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.modeButton,
          wheelMode === 'complex' && styles.modeButtonActive
        ]}
        onPress={() => setWheelMode('complex')}>
        <Text style={[
          styles.modeButtonText,
          wheelMode === 'complex' && styles.modeButtonTextActive
        ]}>{t('flavorswheel.complexMode')}</Text>
      </TouchableOpacity>
    </View>
  );


  // Add handlers for level 3 and 4
  const handleSpecificFlavorPress = useCallback((flavor: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedSpecificFlavor(flavor);
    setCurrentLevel(4);
  }, []);

  const handleSubCategoryPress = useCallback((category: string) => {
    if (detailsPanelY.value === 0) {
      if (category === 'back') {
        if (Platform.OS !== 'web') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        // Reset rotation to original position
        const currentRotation = rotation.value;
        const normalizedRotation = Math.round(currentRotation / 360) * 360;

        scale.value = withSpring(1, { damping: 2 });
        rotation.value = withTiming(normalizedRotation, { duration: 400 });
        opacity.value = withTiming(0.6, { duration: 200 }, () => {
          opacity.value = withTiming(1, { duration: 200 });
          runOnJS(setCurrentLevel)(1);
          runOnJS(setSelectedMainCategory)(null);
        });
        return;
      }

      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      setSelectedSubCategory(prev => prev === category ? null : category);
      if (category !== 'back') {
        setCurrentLevel(3);
      }
    }
  }, []);

  const handleBackToLevel2 = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setCurrentLevel(2);
    setSelectedSpecificFlavor(null);
  }, []);

  // Add this handler near the other handler functions
const handlePress = useCallback((category: string) => {
  if (detailsPanelY.value === 0) {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      triggerHapticFeedback();
    }

    setSelectedCategory(prev => {
      if (prev === category) {
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }
        scale.value = withSpring(1, { damping: 2 });
        opacity.value = withTiming(1);
        return null;
      }

      animateWheelSelection();
      return category;
    });
  }
}, []);

  const handleBackToLevel3 = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setCurrentLevel(3);
    setSelectedSpecificFlavor(null);
  }, []);

  // Update the return statement to include new levels
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {renderHeader()}
        {renderModeSelector()}

        {currentLevel <= 2 ? (
          <Animated.View style={[styles.wheelContainer, animatedStyle]}>
            {wheelMode === 'simple' ? (
              currentLevel === 1 ? (
                <SimpleFlavorWheel
                  WHEEL_SIZE={WHEEL_SIZE}
                  WHEEL_CENTER={WHEEL_CENTER}
                  createPie={createPie}
                  createArc={createArc}
                  handlePress={handleMainCategoryPress}
                  selectedCategory={selectedMainCategory}
                />
              ) : (
                <SecondLevelWheel
                  WHEEL_SIZE={WHEEL_SIZE}
                  WHEEL_CENTER={WHEEL_CENTER}
                  createPie={createPie}
                  createArc={createArc}
                  handlePress={handleSubCategoryPress}
                  selectedMainCategory={selectedMainCategory!}
                  selectedSubCategory={selectedSubCategory}
                />
              )
            ) : (
              <ComplexFlavorWheel
                WHEEL_SIZE={WHEEL_SIZE}
                WHEEL_CENTER={WHEEL_CENTER}
                createPie={createPie}
                createArc={createArc}
                handlePress={handlePress}
              />
            )}
          </Animated.View>
        ) : currentLevel === 3 ? (
          <ThirdLevelList
            mainCategory={selectedMainCategory!}
            subCategory={selectedSubCategory!}
            items={LEVEL_2_CATEGORIES[selectedMainCategory!][selectedSubCategory!]}
            onItemPress={handleSpecificFlavorPress}
            onBack={handleBackToLevel2}
          />
        ) : (
          <FourthLevelList
            mainCategory={selectedMainCategory!}
            subCategory={selectedSubCategory!}
            specificFlavor={selectedSpecificFlavor!}
            items={LEVEL_4_CATEGORIES[selectedSpecificFlavor!] || []} // Use LEVEL_4_CATEGORIES data
            onBack={handleBackToLevel3}
          />
        )}

        {selectedCategory && (
          <PanGestureHandler onGestureEvent={panGestureHandler}>
            <Animated.View style={[styles.detailsContainer, detailsPanelStyle]}>
              <View style={styles.detailsHandle} />
              <Text style={styles.categoryTitle}>
                {t(`flavorswheel.categories.${selectedCategory}.name`)}
              </Text>
              <Text style={styles.categoryTip}>{t('flavorswheel.tastingGuide')}</Text>
              <Text style={styles.tipText}>
                {t(`flavorswheel.categories.${selectedCategory}.howToIdentify`)}
              </Text>
              <View style={styles.flavorsList}>
                {CATEGORIES[selectedCategory]?.items.map((flavor) => (
                  <TouchableOpacity
                    key={typeof flavor === 'string' ? flavor : flavor.name}
                    onPress={() => typeof flavor === 'object' && showFlavorDetail(flavor as FlavorItem)}
                    style={styles.flavorItem}
                  >
                    <Text style={styles.flavorName}>
                      {typeof flavor === 'string' ? flavor : flavor.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          </PanGestureHandler>
        )}

        <FlavorDetailModal
          isVisible={!!selectedFlavor}
          onClose={() => setSelectedFlavor(null)}
          flavor={selectedFlavor || { name: '', description: '', howToIdentify: '' }}
        />
      </View>
    </GestureHandlerRootView>
  );
}