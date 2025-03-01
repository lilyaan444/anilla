import React from 'react';
import { View } from 'react-native';
import Svg, { Path, G, Text as SvgText, Circle, Stop, LinearGradient, Defs } from 'react-native-svg';
import { LEVEL_1_CATEGORIES, LEVEL_2_CATEGORIES } from '../data/simpleFlavorCategories';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export const SecondLevelWheel: React.FC<SecondLevelWheelProps> = ({
  WHEEL_SIZE,
  WHEEL_CENTER,
  createPie,
  createArc,
  handlePress,
  selectedMainCategory,
  selectedSubCategory,
}) => {
  const subCategories = Object.keys(LEVEL_2_CATEGORIES[selectedMainCategory] || {});
  const arcs = createPie(subCategories);
  const SEGMENT_SCALE = 1; // Reduced from 1.05 to make the scaling effect more subtle

  const MAX_WORD_LENGTH = 10; // Longueur maximale des mots avant traitement

  // Récupérer les couleurs de gradient de la catégorie principale
  const getGradientColors = () => {
    // Utiliser les couleurs définies dans LEVEL_1_CATEGORIES pour la catégorie principale
    if (selectedMainCategory && LEVEL_1_CATEGORIES[selectedMainCategory]) {
      return LEVEL_1_CATEGORIES[selectedMainCategory].gradient;
    }
    return ['#DEB887', '#CD853F']; // Couleurs par défaut
  };

  // Générer des variations de couleurs pour les sous-catégories
  const generateVariantColors = (index: number, totalItems: number) => {
    const [baseStart, baseEnd] = getGradientColors();

    // Créer des variations subtiles pour chaque sous-catégorie
    const lightenColor = (color: string, percent: number): string => {
      // Fonction simple pour éclaircir une couleur hex
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;

      return '#' + (
        0x1000000 +
        (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 0 ? 0 : B) : 255)
      ).toString(16).slice(1);
    };

    // Calculer le pourcentage de variation basé sur l'index
    const variationPercent = 10 + (index / totalItems) * 20;

    return [
      lightenColor(baseStart, variationPercent),
      lightenColor(baseEnd, variationPercent - 10)
    ];
  };

  // Formater le texte pour un meilleur affichage
  const formatText = (text: string) => {
    if (text.length <= MAX_WORD_LENGTH) return text.toUpperCase();

    // Pour les mots longs, on peut les couper ou ajouter des retours à la ligne
    const words = text.split(' ');
    if (words.length > 1) {
      // Répartir les mots sur plusieurs lignes
      return text.toUpperCase();
    } else {
      // Pour un seul mot long, on peut le tronquer
      return `${text.substring(0, MAX_WORD_LENGTH-2)}..`.toUpperCase();
    }
  };

  return (
    <Svg height={WHEEL_SIZE} width={WHEEL_SIZE} viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}>
      <Defs>
        {subCategories.map((category, index) => {
          const [startColor, endColor] = generateVariantColors(index, subCategories.length);
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
          const category = subCategories[index];
          const angle = (arc.startAngle + arc.endAngle) / 2;
          const textRadius = WHEEL_SIZE / 3;
          const textX = textRadius * Math.cos(angle - Math.PI / 2);
          const textY = textRadius * Math.sin(angle - Math.PI / 2);
          let rotation = (angle * 180) / Math.PI - 90;
          if (angle > Math.PI) rotation += 180;

          const isSelected = selectedSubCategory === category;
          const scale = isSelected ? SEGMENT_SCALE : 1;

          // Modified transform logic to handle scaling more smoothly
          return (
            <G key={category}>
              <Path
                d={createArc(arc)}
                fill={`url(#gradient-${index})`}
                stroke="#FFF"
                strokeWidth={1.5}
                onPress={() => handlePress(category)}
                transform={isSelected ? `scale(${scale})` : undefined}
                opacity={isSelected ? 0.9 : 1} // Added slight opacity change for selected segment
              />
              <G
                transform={`translate(${textX}, ${textY}) rotate(${rotation})`}
                opacity={isSelected ? 1 : 0.9} // Text opacity adjustment
              >
                <SvgText
                  fill="#FFF"
                  fontSize={11}
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {category.toUpperCase()}
                </SvgText>
              </G>
            </G>
          );
        })}

        {/* Updated center back button */}
        <Circle
          r={WHEEL_SIZE / 4}
          fill="#FDF5E6"
          stroke="#8B4513"
          strokeWidth={2}
          onPress={() => handlePress('back')}
        />
        <SvgText
          x="0"
          y="-5"
          fill="#8B4513"
          fontSize={16}
          fontWeight="bold"
          textAnchor="middle"
        >
          {selectedMainCategory}
        </SvgText>
        <Path
          d="M-12,15 L12,15 M-12,15 L-4,8 M-12,15 L-4,22"
          stroke="#8B4513"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          onPress={() => handlePress('back')}
        />
      </G>
    </Svg>
  );
};