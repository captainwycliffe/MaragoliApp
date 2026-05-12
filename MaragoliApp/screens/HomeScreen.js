import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import BottomNavBar from '../components/BottomNavBar';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* TopAppBar — respects status bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <View style={styles.topBarLeft}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <MaterialIcons name="menu" size={24} color="#2D5A27" />
          </TouchableOpacity>
          <Text style={styles.appTitle}>Maragoli Translate</Text>
        </View>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4_gQ7YIEiB_S0cxs45Yv4eR_faLG2-TU5-iAd4PJR8MkgzzeZE1qMUUm7WkW-X6mN65_1oSAXhwB0ZpQCWgxJXw6a7qPbFNasaFJUiIMIoJ4zltTlKQipnKJbuh6oNo1QfmDWPBHD1k4Foj-Mh-URZXx7pAiuJIQNkTFE4lDibYtaMZr8xtP4aZbtguSmN-YNdbn6IYrd0vljkPDTtxtZTbDb1Cbqw2aMONPI2CZvwVnMHDBV03wtGAnRZE3EFIiyWVgueTyCExk',
            }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero / Progress Section ── */}
        <View style={styles.heroSection}>
          <View style={styles.heroRow}>
            <Text style={styles.heroGreeting}>{'Habari,\nVuguvugu'}</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Level 4</Text>
              <Text style={styles.levelSubtext}>MASTERY PATH</Text>
            </View>
          </View>
        </View>

        {/* ── Main Actions Bento Grid ── */}
        <View style={styles.bentoGrid}>

          {/* Text Translation — primary full-width card */}
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => navigation.navigate('Translate')}
            style={styles.primaryCardWrapper}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryContainer]}
              style={styles.primaryCard}
            >
              {/* Icon */}
              <View style={styles.primaryCardIconCircle}>
                <MaterialIcons name="translate" size={24} color={colors.onSecondaryContainer} />
              </View>
              {/* Title + subtitle */}
              <Text style={styles.primaryCardTitle}>Text Translation</Text>
              <Text style={styles.primaryCardSubtitle}>
                Translate words and sentences instantly.
              </Text>
              {/* CTA row */}
              <View style={styles.primaryCardCta}>
                <Text style={styles.primaryCardCtaText}>START TYPING</Text>
                <MaterialIcons name="arrow-forward" size={16} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Saved Phrases */}
          <TouchableOpacity
            style={styles.savedCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Saved')}
          >
            <View style={styles.secondaryCardIcon}>
              <MaterialIcons name="bookmark" size={22} color={colors.onSecondaryContainer} />
            </View>
            <View>
              <Text style={styles.secondaryCardTitle}>Saved Phrases</Text>
              <Text style={styles.secondaryCardSubtitle}>Browse the full Maragoli phrase library</Text>
            </View>
          </TouchableOpacity>

          {/* Contribute Data — full width */}
          <TouchableOpacity
            style={styles.contributeCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Contribution')}
          >
            <View style={styles.contributeIconBox}>
              <MaterialIcons name="volunteer-activism" size={28} color={colors.secondary} />
            </View>
            <View style={styles.contributeText}>
              <Text style={styles.contributeTitle}>Contribute Data</Text>
              <Text style={styles.contributeSubtitle}>
                Help improve our Maragoli engine with your local knowledge.
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.outline} />
          </TouchableOpacity>
        </View>

        {/* ── Word of the Day ── */}
        <LinearGradient
          colors={[colors.surfaceContainerLow, colors.surfaceContainer]}
          style={styles.wordOfDay}
        >
          <View style={styles.wotdInner}>
            <View style={styles.wotdLabelRow}>
              <MaterialIcons name="auto-stories" size={14} color={colors.secondary} />
              <Text style={styles.wotdLabel}>Word of the Day</Text>
            </View>
            <Text style={styles.wotdWord}>Mirembe</Text>
            <Text style={styles.wotdMeaning}>Peace / Greeting</Text>
            <View style={styles.wotdDivider} />
            <Text style={styles.wotdDescription}>
              "Mirembe" is more than just peace; it's a foundational greeting that wishes total
              well-being upon the listener.
            </Text>
          </View>
          {/* Decorative icon — absolute, behind content */}
          <View style={styles.wotdDecor} pointerEvents="none">
            <MaterialIcons name="auto-stories" size={128} color={colors.onSurface} />
          </View>
        </LinearGradient>

        {/* Spacer so content clears bottom nav */}
        <View style={{ height: insets.bottom + 100 }} />
      </ScrollView>

      <BottomNavBar activeTab="Home" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  /* ── Top bar ── */
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 12,
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
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(21, 66, 18, 0.1)',
    backgroundColor: colors.surfaceContainerHigh,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },

  /* ── Scroll ── */
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 32,
  },

  /* ── Hero section ── */
  heroSection: {
    gap: 16,
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  heroGreeting: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 36,
    color: colors.primary,
    lineHeight: 46,
    letterSpacing: -1,
  },
  levelBadge: {
    alignItems: 'flex-end',
  },
  levelText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 18,
    color: colors.secondary,
  },
  levelSubtext: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 10,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  progressTrack: {
    height: 16,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressFill: {
    width: '66%',
    height: '100%',
    borderRadius: 9999,
  },

  /* ── Bento grid ── */
  bentoGrid: {
    gap: 16,
  },

  /* Primary card */
  primaryCardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryCard: {
    padding: 32,
    gap: 12,
  },
  primaryCardIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  primaryCardTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 28,
    color: '#ffffff',
    lineHeight: 34,
  },
  primaryCardSubtitle: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 14,
    color: 'rgba(157, 208, 144, 0.85)',
    marginBottom: 12,
  },
  primaryCardCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  primaryCardCtaText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 11,
    color: '#ffffff',
    letterSpacing: 2,
  },

  /* Saved card (full-width) */
  savedCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  secondaryCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryCardTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 18,
    color: colors.primary,
    lineHeight: 24,
    marginBottom: 4,
  },
  secondaryCardSubtitle: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },

  /* Contribute card */
  contributeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 24,
    padding: 24,
    gap: 24,
  },
  contributeIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(194, 201, 187, 0.2)',
    flexShrink: 0,
  },
  contributeText: {
    flex: 1,
    gap: 4,
  },
  contributeTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 17,
    color: colors.primary,
  },
  contributeSubtitle: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },

  /* Word of the Day */
  wordOfDay: {
    borderRadius: 24,
    padding: 28,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  wotdInner: {
    zIndex: 1,
  },
  wotdLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  wotdLabel: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 11,
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  wotdWord: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 32,
    color: colors.primary,
    marginTop: 8,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  wotdMeaning: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  wotdDivider: {
    height: 1,
    backgroundColor: 'rgba(194, 201, 187, 0.25)',
    marginVertical: 16,
  },
  wotdDescription: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    color: colors.onSurface,
    lineHeight: 22,
  },
  wotdDecor: {
    position: 'absolute',
    right: -20,
    top: -20,
    opacity: 0.08,
    zIndex: 0,
  },
});
