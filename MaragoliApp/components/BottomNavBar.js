import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const TAB_ITEMS = [
  { name: 'Home', icon: 'home', route: 'Home' },
  { name: 'Translate', icon: 'translate', route: 'Translate' },
  { name: 'Saved', icon: 'bookmark', route: 'Saved' },
  { name: 'Settings', icon: 'settings', route: 'Settings' },
];

export default function BottomNavBar({ activeTab, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      {TAB_ITEMS.map((tab) => {
        const isActive = activeTab === tab.route;
        return (
          <TouchableOpacity
            key={tab.route}
            style={[styles.tabItem, isActive && styles.tabItemActive]}
            onPress={() => navigation.navigate(tab.route)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={tab.icon}
              size={24}
              color={isActive ? colors.primary : colors.onSurfaceVariant}
            />
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.name.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(251, 251, 226, 0.95)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
  },
  tabItemActive: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  tabLabel: {
    fontSize: 9,
    fontFamily: 'Lexend_400Regular',
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginTop: 2,
    letterSpacing: 0.8,
  },
  tabLabelActive: {
    color: colors.primary,
  },
});
