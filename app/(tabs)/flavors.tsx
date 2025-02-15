import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { useState, useCallback } from 'react';
import Svg, { Path, G, Text as SvgText, Circle } from 'react-native-svg';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  interpolateColor
} from 'react-native-reanimated';
import * as d3Shape from 'd3-shape';
import chroma from 'chroma-js';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = {
  'Earth & Wood': {
    color: '#8B4513',
    items: ['Cedar', 'Oak', 'Pine', 'Soil', 'Moss', 'Leather', 'Peat', 'Forest'],
    gradient: ['#8B4513', '#654321']
  },
  'Spices': {
    color: '#D2691E',
    items: ['Black Pepper', 'White Pepper', 'Cinnamon', 'Nutmeg', 'Clove', 'Cardamom', 'Anise'],
    gradient: ['#D2691E', '#8B4513']
  },
  'Sweet': {
    color: '#DEB887',
    items: ['Caramel', 'Honey', 'Molasses', 'Vanilla', 'Cocoa', 'Dark Chocolate', 'Toffee'],
    gradient: ['#DEB887', '#CD853F']
  },
  'Roasted': {
    color: '#8B4513',
    items: ['Coffee', 'Espresso', 'Toasted Nuts', 'Roasted Almonds', 'Dark Roast', 'Charred Wood'],
    gradient: ['#A0522D', '#654321']
  },
  'Nuts & Beans': {
    color: '#CD853F',
    items: ['Almond', 'Walnut', 'Hazelnut', 'Peanut', 'Coffee Bean', 'Cocoa Bean'],
    gradient: ['#DEB887', '#8B4513']
  },
  'Herbs': {
    color: '#556B2F',
    items: ['Sage', 'Thyme', 'Bay Leaf', 'Oregano', 'Mint', 'Rosemary'],
    gradient: ['#6B8E23', '#2F4F4F']
  },
  'Floral': {
    color: '#9932CC',
    items: ['Rose', 'Jasmine', 'Lavender', 'Orange Blossom', 'Chamomile', 'Violet'],
    gradient: ['#BA55D3', '#4B0082']
  },
  'Fruits': {
    color: '#FF8C00',
    items: ['Citrus', 'Orange Peel', 'Raisin', 'Fig', 'Plum', 'Cherry', 'Dark Berries'],
    gradient: ['#FFA500', '#D2691E']
  }
};

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.85;
const WHEEL_CENTER = WHEEL_SIZE / 2;


export default function FlavorWheel() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  const createPie = d3Shape
    .pie()
    .value(() => 1)
    .sort(null);

  const createArc = d3Shape
    .arc()
    .outerRadius(WHEEL_SIZE / 2)
    .innerRadius(WHEEL_SIZE / 4)
    .padAngle(0.03)
    .cornerRadius(8);

  const handlePress = useCallback((category) => {
    setSelectedCategory(prev => {
      const isSelected = prev === category;
      scale.value = withSpring(isSelected ? 1 : 1.1);
      rotation.value = withTiming(rotation.value + 360, { duration: 1000 });
      opacity.value = withTiming(0.8, { duration: 200 });
      return isSelected ? null : category;
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
    opacity: opacity.value,
  }));

  const renderWheel = () => {
    const arcs = createPie(Object.keys(CATEGORIES));

    return (
      <Svg height={WHEEL_SIZE} width={WHEEL_SIZE} viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}>
        <defs>
          {Object.keys(CATEGORIES).map((category, index) => {
            const [startColor, endColor] = CATEGORIES[category].gradient;
            return (
              <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={startColor} />
                <stop offset="100%" stopColor={endColor} />
              </linearGradient>
            );
          })}
        </defs>
        <G transform={`translate(${WHEEL_CENTER}, ${WHEEL_CENTER})`}>
          {arcs.map((arc, index) => {
            const category = Object.keys(CATEGORIES)[index];
            return (
              <G key={category}>
                <Path
                  d={createArc(arc)}
                  fill={`url(#gradient-${index})`}
                  stroke="#FFF"
                  strokeWidth={2}
                  onPress={() => handlePress(category)}
                />
                <SvgText
                  x={createArc.centroid(arc)[0]}
                  y={createArc.centroid(arc)[1]}
                  fill="#FFF"
                  fontSize={14}
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {category}
                </SvgText>
              </G>
            );
          })}
          <Circle r={WHEEL_SIZE / 4 - 2} fill="#FDF5E6" stroke="#8B4513" strokeWidth={2} />
        </G>
      </Svg>
    );
  };


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
            <Text style={styles.title}>Cigar Flavor Wheel</Text>
            <Text style={styles.subtitle}>Explore cigar taste profiles</Text>
          </View>
        </View>

        <Animated.View style={[styles.wheelContainer, animatedStyle]}>
          {renderWheel()}
        </Animated.View>

        {selectedCategory && (
          <View style={styles.detailsContainer}>
            <Text style={styles.categoryTitle}>{selectedCategory}</Text>
            <View style={styles.flavorsList}>
              {CATEGORIES[selectedCategory].items.map((flavor) => (
                <Text key={flavor} style={styles.flavorItem}>
                  {flavor}
                </Text>
              ))}
            </View>
          </View>
        )}
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
    color: '#8B4513',
    fontSize: 14,
  },
});