import React from 'react';
import { View } from 'react-native';
import Svg, { Path, G, Text as SvgText, Circle, Stop, LinearGradient, Defs } from 'react-native-svg';
import { CATEGORIES } from '../data/flavorCategories';

interface ComplexFlavorWheelProps {
  WHEEL_SIZE: number;
  WHEEL_CENTER: number;
  createPie: any;
  createArc: any;
  handlePress: (category: string) => void;
}

export const ComplexFlavorWheel: React.FC<ComplexFlavorWheelProps> = ({
  WHEEL_SIZE,
  WHEEL_CENTER,
  createPie,
  createArc,
  handlePress,
}) => {
  const MAX_WORD_LENGTH = 10;
  const MAX_LINES = 2;
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
          const angle = (arc.startAngle + arc.endAngle) / 2;

          let textLengthAdjustment = angle < Math.PI ? -5 : -15;
          const dynamicTextRadius = (WHEEL_SIZE / 3 - 10) + 30 + textLengthAdjustment;

          const textX = dynamicTextRadius * Math.cos(angle - Math.PI / 2);
          const textY = dynamicTextRadius * Math.sin(angle - Math.PI / 2);

          let rotation = (angle * 180) / Math.PI - 90;
          if (angle > Math.PI) rotation += 180;

          const words = category.split(' ');
          const displayLines = [];
          let currentLine = '';

          for (const word of words) {
            if (currentLine.length + word.length + 1 <= MAX_WORD_LENGTH) {
              currentLine += (currentLine.length ? ' ' : '') + word;
            } else {
              displayLines.push(currentLine.trim());
              currentLine = word;
              if (displayLines.length >= MAX_LINES) break;
            }
          }
          if (currentLine.length) displayLines.push(currentLine.trim());
          if (displayLines.length > MAX_LINES) {
            displayLines.length = MAX_LINES;
            displayLines[MAX_LINES - 1] = displayLines[MAX_LINES - 1].slice(0, MAX_WORD_LENGTH - 3) + '...';
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
                  const verticalAdjustment = lineIndex * 18;
                  return (
                    <SvgText
                      key={lineIndex}
                      fill="#FFF"
                      fontSize={line.length > 15 ? 10 : 12}
                      fontWeight="bold"
                      fontFamily="Arial"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      y={verticalAdjustment}
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