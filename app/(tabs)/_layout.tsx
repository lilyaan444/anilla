import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Pressable } from 'react-native';
import { useTranslation } from '../../src/hooks/useTranslation';
import * as Haptics from 'expo-haptics';

const BROWN = '#8B4513';
const isWeb = Platform.OS === 'web';

export default function TabLayout() {
  const { t } = useTranslation();

  const handleTabPress = () => {
    if (!isWeb) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FDF5E6',
          borderTopColor: '#DEB887',
          height: isWeb ? 60 : 85,
          paddingBottom: isWeb ? 5 : 25,
          paddingTop: isWeb ? 5 : 0,
        },
        tabBarActiveTintColor: BROWN,
        tabBarInactiveTintColor: '#A0522D',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginBottom: -3,
        },
        tabBarItemStyle: {
          paddingTop: 8,
        },
        tabBarButton: (props) => (
          <Pressable
            {...props}
            onPress={(e) => {
              handleTabPress();
              props.onPress?.(e);
            }}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation.home'),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t('navigation.search'),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t('navigation.favorites'),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('navigation.profile'),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: t('navigation.friends'),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="people-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="flavors"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}