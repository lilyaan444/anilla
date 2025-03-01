import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G, Text as SvgText, Circle, Stop, LinearGradient, Defs } from 'react-native-svg';
import { LEVEL_1_CATEGORIES } from '../data/simpleFlavorCategories';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing
} from 'react-native-reanimated';

interface SimpleFlavorWheelProps {
  WHEEL_SIZE: number;
  WHEEL_CENTER: number;
  createPie: any;
  createArc: any;
  handlePress: (category: string) => void;
  selectedCategory: string | null;
}

export const SimpleFlavorWheel: React.FC<SimpleFlavorWheelProps> = ({
  WHEEL_SIZE,
  WHEEL_CENTER,
  createPie,
  createArc,
  handlePress,
  selectedCategory,
}) => {
  const arcs = createPie(Object.keys(LEVEL_1_CATEGORIES));
  const SEGMENT_SCALE = 1.08;
  const HOVER_OPACITY = 0.9;

  // Ajout d'une animation de rotation douce
  const wheelRotation = useSharedValue(0);

  // Animation d'entrée lors du premier affichage
  useEffect(() => {
    wheelRotation.value = withTiming(360, {
      duration: 1200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, []);

  // Animation de rebond lors de la sélection
  useEffect(() => {
    if (selectedCategory) {
      wheelRotation.value = withSequence(
        withTiming(wheelRotation.value + 5, { duration: 100 }),
        withTiming(wheelRotation.value, { duration: 300 })
      );
    }
  }, [selectedCategory]);

  // Valeurs d'animation pour chaque segment
  const segmentAnimations = Object.keys(LEVEL_1_CATEGORIES).map(() => ({
    scale: useSharedValue(1),
    opacity: useSharedValue(1),
    glow: useSharedValue(0),
  }));

  // Animation pour le cercle central
  const centerCircleScale = useSharedValue(1);
  const centerCirclePulse = useSharedValue(0);

  // Effet de pulsation pour le cercle central
  useEffect(() => {
    centerCirclePulse.value = withRepeat(
      withTiming(1, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // -1 means infinite repetition
      true // reverse the animation
    );
  }, []);

  // Animation du cercle central quand un segment est sélectionné
  useEffect(() => {
    if (selectedCategory) {
      centerCircleScale.value = withSpring(1.1, { damping: 12, stiffness: 100 });
    } else {
      centerCircleScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    }
  }, [selectedCategory]);

  return (
    <Svg height={WHEEL_SIZE} width={WHEEL_SIZE} viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}>
      <Defs>
        <LinearGradient id="centerGlow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FDF5E6" stopOpacity="0.9" />
          <Stop offset="50%" stopColor="#FDF5E6" stopOpacity="0.6" />
          <Stop offset="100%" stopColor="#FDF5E6" stopOpacity="0.3" />
        </LinearGradient>

        {Object.keys(LEVEL_1_CATEGORIES).map((category, index) => {
          const [startColor, endColor] = LEVEL_1_CATEGORIES[category].gradient;
          const angle = (index * (360 / Object.keys(LEVEL_1_CATEGORIES).length));

          return (
            <LinearGradient
              key={index}
              id={`gradient-${index}`}
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="1"
              gradientTransform={`rotate(${45 + angle}, 0.5, 0.5)`}
            >
              <Stop offset="0%" stopColor={startColor} stopOpacity="0.95" />
              <Stop offset="50%" stopColor={endColor} stopOpacity="0.85" />
              <Stop offset="100%" stopColor={startColor} stopOpacity="0.95" />
            </LinearGradient>
          );
        })}

        {/* Glow effects for selected segments */}
        {Object.keys(LEVEL_1_CATEGORIES).map((category, index) => {
          const [startColor, endColor] = LEVEL_1_CATEGORIES[category].gradient;
          const angle = (index * (360 / Object.keys(LEVEL_1_CATEGORIES).length));

          return (
            <LinearGradient
              key={`glow-${index}`}
              id={`glow-${index}`}
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="1"
              gradientTransform={`rotate(${45 + angle}, 0.5, 0.5)`}
            >
              <Stop offset="0%" stopColor={startColor} stopOpacity="0.8" />
              <Stop offset="50%" stopColor={endColor} stopOpacity="0.6" />
              <Stop offset="100%" stopColor={startColor} stopOpacity="0.4" />
            </LinearGradient>
          );
        })}
      </Defs>

      {/* Cercle de fond avec effet de lueur */}
      <Circle
        cx={WHEEL_CENTER}
        cy={WHEEL_CENTER}
        r={WHEEL_SIZE / 2 + 10}
        fill="url(#centerGlow)"
        opacity={0.5}
      />

      <G transform={`translate(${WHEEL_CENTER}, ${WHEEL_CENTER})`}>
        {arcs.map((arc, index) => {
          const category = Object.keys(LEVEL_1_CATEGORIES)[index];
          const angle = (arc.startAngle + arc.endAngle) / 2;
          const textRadius = WHEEL_SIZE / 3;
          const textX = textRadius * Math.cos(angle - Math.PI / 2);
          const textY = textRadius * Math.sin(angle - Math.PI / 2);
          let rotation = (angle * 180) / Math.PI - 90;
          if (angle > Math.PI) rotation += 180;

          const isSelected = selectedCategory === category;

          // Animer le segment sélectionné
          if (isSelected && segmentAnimations[index].scale.value !== SEGMENT_SCALE) {
            segmentAnimations[index].scale.value = withSpring(SEGMENT_SCALE, { damping: 10, stiffness: 100 });
            segmentAnimations[index].opacity.value = withTiming(HOVER_OPACITY, { duration: 200 });
            segmentAnimations[index].glow.value = withTiming(1, { duration: 300 });
          } else if (!isSelected && segmentAnimations[index].scale.value !== 1) {
            segmentAnimations[index].scale.value = withSpring(1, { damping: 10, stiffness: 100 });
            segmentAnimations[index].opacity.value = withTiming(1, { duration: 200 });
            segmentAnimations[index].glow.value = withTiming(0, { duration: 300 });
          }

          const scale = isSelected ? segmentAnimations[index].scale.value : 1;

          return (
            <G key={category}>
              {/* Effet de lueur derrière le segment sélectionné */}
              {isSelected && (
                <Path
                  d={createArc(arc)}
                  fill={`url(#glow-${index})`}
                  opacity={0.6}
                  transform={`scale(${SEGMENT_SCALE + 0.05})`}
                />
              )}

              <Path
                d={createArc(arc)}
                fill={`url(#gradient-${index})`}
                stroke="#FFF"
                strokeWidth={1.5}
                onPress={() => handlePress(category)}
                transform={isSelected ? `scale(${scale})` : undefined}
                opacity={isSelected ? segmentAnimations[index].opacity.value : 1}
              />

              <G transform={`translate(${textX}, ${textY}) rotate(${rotation})`}>
                <SvgText
                  fill="#FFF"
                  fontSize={14}
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  opacity={isSelected ? 1 : 0.9}
                >
                  {category.toUpperCase()}
                </SvgText>
              </G>
            </G>
          );
        })}

        {/* Cercle central avec animation de pulsation */}
        <Circle
          r={WHEEL_SIZE / 4 * (1 + centerCirclePulse.value * 0.05)}
          fill="#FDF5E6"
          stroke="#8B4513"
          strokeWidth={2}
          opacity={1 - centerCirclePulse.value * 0.2}
          transform={`scale(${centerCircleScale.value})`}
        />

        {/* Texte au centre */}
        <SvgText
          fill="#8B4513"
          fontSize={16}
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          SAVEURS
        </SvgText>
      </G>

      {/* Indicateur de sélection actuelle */}
      {selectedCategory && (
        <Circle
          cx={WHEEL_CENTER}
          cy={WHEEL_SIZE - 30}
          r={15}
          fill={LEVEL_1_CATEGORIES[selectedCategory]?.color || "#8B4513"}
          opacity={0.8}
        />
      )}
    </Svg>
  );
};