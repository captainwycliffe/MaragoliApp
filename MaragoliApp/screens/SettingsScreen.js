import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import BottomNavBar from '../components/BottomNavBar';

function ToggleSwitch({ value, onToggle }) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.8}
      style={[styles.toggle, value && styles.toggleOn]}
    >
      <View style={[styles.toggleThumb, value && styles.toggleThumbOn]} />
    </TouchableOpacity>
  );
}

function SettingsRow({ icon, title, subtitle, rightElement, onPress }) {
  return (
    <TouchableOpacity
      style={styles.settingsRow}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
    >
      <View style={styles.settingsRowLeft}>
        <View style={styles.settingsRowIconCircle}>
          <MaterialIcons name={icon} size={22} color={colors.secondary} />
        </View>
        <View style={styles.settingsRowText}>
          <Text style={styles.settingsRowTitle}>{title}</Text>
          <Text style={styles.settingsRowSubtitle}>{subtitle}</Text>
        </View>
      </View>
      {rightElement}
    </TouchableOpacity>
  );
}

export default function SettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* TopAppBar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <MaterialIcons name="menu" size={24} color="#2D5A27" />
          </TouchableOpacity>
          <Text style={styles.appTitle}>Settings</Text>
        </View>
        <Text style={styles.versionText}>v2.4.0</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Hero */}
        <View style={styles.profileHero}>
          <View style={styles.profileHeroText}>
            <Text style={styles.profileHeroTitle}>Manage Preferences</Text>
            <Text style={styles.profileHeroSubtitle}>
              Customize your Maragoli experience, language packs, and appearance.
            </Text>
          </View>
          <View style={styles.profileHeroIcon}>
            <MaterialIcons name="person" size={32} color={colors.onSecondaryContainer} />
          </View>
        </View>

        {/* General Preferences Group */}
        <View style={styles.settingsGroup}>
          <Text style={styles.groupLabel}>GENERAL PREFERENCES</Text>
          <View style={styles.settingsList}>
            <SettingsRow
              icon="language"
              title="Language"
              subtitle="Luluhya (Maragoli)"
              rightElement={
                <MaterialIcons name="chevron-right" size={24} color={colors.outline} />
              }
              onPress={() => {}}
            />
            <SettingsRow
              icon="dark-mode"
              title="Dark Mode"
              subtitle="Switch theme"
              rightElement={
                <ToggleSwitch value={darkMode} onToggle={() => setDarkMode(!darkMode)} />
              }
            />
            <SettingsRow
              icon="download-done"
              title="Offline Translation"
              subtitle="Download language packs"
              rightElement={
                <ToggleSwitch
                  value={offlineMode}
                  onToggle={() => setOfflineMode(!offlineMode)}
                />
              }
            />
          </View>
        </View>

        {/* About App Group */}
        <View style={styles.settingsGroup}>
          <Text style={styles.groupLabel}>ABOUT APP</Text>
          <View style={styles.settingsList}>
            <SettingsRow
              icon="info-outline"
              title="Privacy Policy"
              subtitle="How we handle data"
              rightElement={
                <MaterialIcons name="open-in-new" size={22} color={colors.outline} />
              }
              onPress={() => {}}
            />
            <SettingsRow
              icon="contact-support"
              title="Help & Support"
              subtitle="Get assistance"
              rightElement={
                <MaterialIcons name="chevron-right" size={24} color={colors.outline} />
              }
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>MARAGOLI TRANSLATE © 2024</Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <BottomNavBar activeTab="Settings" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.surface,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 9999,
  },
  appTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 20,
    color: colors.primary,
    letterSpacing: -0.3,
  },
  versionText: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 32,
  },
  profileHero: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  profileHeroText: {
    gap: 8,
    maxWidth: '65%',
  },
  profileHeroTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 22,
    color: colors.primary,
    letterSpacing: -0.3,
  },
  profileHeroSubtitle: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
  },
  profileHeroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsGroup: {
    gap: 16,
  },
  groupLabel: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 11,
    color: colors.secondary,
    letterSpacing: 2,
    paddingLeft: 8,
  },
  settingsList: {
    gap: 12,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  settingsRowIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(254, 158, 114, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsRowText: {
    gap: 2,
  },
  settingsRowTitle: {
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 15,
    color: colors.onSurface,
  },
  settingsRowSubtitle: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  toggle: {
    width: 48,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHighest,
    padding: 4,
    justifyContent: 'center',
  },
  toggleOn: {
    backgroundColor: colors.primaryContainer,
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbOn: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  footerText: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 11,
    color: colors.outline,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
