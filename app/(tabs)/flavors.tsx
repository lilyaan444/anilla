import { View, Text, StyleSheet, Dimensions, Platform, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import Svg, { Path, G, Text as SvgText, Circle, Stop, LinearGradient, Defs, TSpan } from 'react-native-svg';import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  runOnJS,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import * as d3Shape from 'd3-shape';
import chroma from 'chroma-js';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../../src/data/flavorCategories';
import FlavorDetailModal from '../../src/components/FlavorDetailModal';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';


const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.85; // Légèrement plus petit pour plus d'élégance
const WHEEL_CENTER = WHEEL_SIZE / 2;
const TEXT_RADIUS = WHEEL_SIZE / 3.2;

export default function FlavorWheel() {
  const [fontsLoaded] = useFonts({
    'Playfair': require('../../assets/fonts/PlayfairDisplay-Bold.ttf'),
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);

  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  const showFlavorDetail = (flavor) => {
    setSelectedFlavor(flavor);
  };

  const createPie = d3Shape.pie().value(() => 1).sort(null);

  const createArc = d3Shape
    .arc()
    .outerRadius(WHEEL_SIZE / 2 ) // Augmentez la taille extérieure
    .innerRadius(WHEEL_SIZE / 4 - 10) // Réduisez légèrement la taille intérieure
    .padAngle(0.02)
    .cornerRadius(6);


  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
    opacity: opacity.value,
  }));


  const MAX_WORD_LENGTH = 10; // Longueur maximale des mots avant d'envisager un retour
  const MAX_LINES = 2; // Nombre max de lignes avant de tronquer le texte

  const renderWheel = () => {
    const arcs = createPie(Object.keys(CATEGORIES));

    return (
      <Svg height={WHEEL_SIZE} width={WHEEL_SIZE} viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}>
        <Defs>
          {Object.keys(CATEGORIES).map((category, index) => {
            const [startColor, endColor] = CATEGORIES[category].gradient;
            return (
              <LinearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor={startColor} />
                <Stop offset="100%" stopColor={endColor} />
              </LinearGradient>
            );
          })}
        </Defs>
        <G transform={`translate(${WHEEL_CENTER}, ${WHEEL_CENTER})`}>
          {arcs.map((arc, index) => {
            const category = Object.keys(CATEGORIES)[index];
            const angle = (arc.startAngle + arc.endAngle) / 2; // Angle central de l'arc

            // Ajustement du rayon en fonction de la position
            let textLengthAdjustment = 0;

            if (angle < Math.PI) {
              textLengthAdjustment = -5; // Ajustement pour la partie droite
            } else {
              textLengthAdjustment = -15; // Ajustement pour la partie gauche
            }

            const dynamicTextRadius = (WHEEL_SIZE / 3 - 10) + 30 + textLengthAdjustment; // Modifiez ici aussi


            const textX = dynamicTextRadius * Math.cos(angle - Math.PI / 2);
            const textY = dynamicTextRadius * Math.sin(angle - Math.PI / 2);

            let rotation = (angle * 180) / Math.PI - 90; // Rotation pour le texte
            if (angle > Math.PI) {
              rotation += 180; // Ajustement pour l'angle supérieur
            }

            // Traitements des mots
            const words = category.split(' ');
            const displayLines = [];
            let currentLine = '';

            // Création des lignes sans chevauchement
            for (const word of words) {
              if (currentLine.length + word.length + 1 <= MAX_WORD_LENGTH) {
                currentLine += (currentLine.length ? ' ' : '') + word;
              } else {
                displayLines.push(currentLine.trim());
                currentLine = word;
                if (displayLines.length >= MAX_LINES) break; // Respecte le max de lignes
              }
            }
            if (currentLine.length) displayLines.push(currentLine.trim());
            if (displayLines.length > MAX_LINES) {
              displayLines.length = MAX_LINES;
              displayLines[MAX_LINES - 1] = displayLines[MAX_LINES - 1].slice(0, MAX_WORD_LENGTH - 3) + '...'; // Ajouter des ellipses
            }

            return (
              <G key={category}>
                <Path
                  d={createArc(arc)}
                  fill={`url(#gradient-${index})`}
                  stroke="#FFF"
                  strokeWidth={1.5}
                  onPress={() => handlePress(category)}
                />
                <G transform={`translate(${textX}, ${textY}) rotate(${rotation})`}>
                  {displayLines.map((line, lineIndex) => {
                    const lineLength = line.length;
                    const letterSpacing = 2; // Espacement entre les lettres
                    const startX = -((lineLength - 1) * letterSpacing) / 2; // Centrage de la ligne

                    // Ajustement vertical avec un espacement uniforme
                    const verticalAdjustment = lineIndex * 18; // Ajustez la valeur si nécessaire

                    return (
                      <SvgText
                        key={lineIndex}
                        fill="#FFF" // Couleur du texte
                        fontSize={lineLength > 15 ? 10 : 12} // Réduction de la taille si trop long
                        fontWeight="bold"
                        fontFamily="Arial"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        // Retirer stroke pour enlever le contour
                        // stroke="#000"
                        // strokeWidth={0.3}
                        x={startX}  // Position centrée
                        y={verticalAdjustment} // Ajustement vertical pour éviter le chevauchement
                      >
                        {line.toUpperCase()}
                      </SvgText>
                    );
                  })}
                </G>
              </G>
            );
          })}
          <Circle
            r={WHEEL_SIZE / 4 - 2}
            fill="#FDF5E6"
            stroke="#8B4513"
            strokeWidth={2}
          />
        </G>
      </Svg>
    );
  };













  const detailsPanelY = useSharedValue(0);

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

  const handlePress = useCallback((category) => {
    if (detailsPanelY.value === 0) {
      setSelectedCategory(prev => {
        if (prev === category) {
          scale.value = withSpring(1, { damping: 2 }); // Un rebond en douceur
          opacity.value = withTiming(1);
          return null;
        }

        // Appliquer une animation d'échelle avec rebond lorsqu'une nouvelle catégorie est sélectionnée
        scale.value = withSpring(1.1, { damping: 2, stiffness: 100 });
        rotation.value = withTiming(rotation.value + 360, { duration: 600 }); // Tourner légèrement la roue

        opacity.value = withTiming(0.6, { duration: 200 }, () => {
          opacity.value = withTiming(1, { duration: 200 }); // Remet la roue à son opacité normale
        });

        return category;
      });
    }
  }, []);





  const detailsPanelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: detailsPanelY.value }]
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#8B4513" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Roue des Saveurs de Cigares</Text>
            <Text style={styles.subtitle}>Explorez les profils gustatifs</Text>
          </View>
        </View>

        <Animated.View style={[styles.wheelContainer, animatedStyle]}>
          {renderWheel()}
        </Animated.View>

        {selectedCategory && (
          <PanGestureHandler onGestureEvent={panGestureHandler}>
            <Animated.View style={[styles.detailsContainer, detailsPanelStyle]}>
              <View style={styles.detailsHandle} />
              <Text style={styles.categoryTitle}>{selectedCategory}</Text>
              <Text style={styles.categoryTip}>Guide de dégustation</Text>
              <Text style={styles.tipText}>
                {CATEGORIES[selectedCategory].howToIdentify}
              </Text>
              <View style={styles.flavorsList}>
                {CATEGORIES[selectedCategory].items.map((flavor) => (
                  <TouchableOpacity
                    key={typeof flavor === 'string' ? flavor : flavor.name}
                    onPress={() => typeof flavor === 'object' && showFlavorDetail(flavor)}
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

const styles = StyleSheet.create({
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
});