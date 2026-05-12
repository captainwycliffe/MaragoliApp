import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const { width } = Dimensions.get('window');
const CARD_SIZE = width - 64;

export default function OnboardingScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>Maragoli Translate</Text>
        </View>

        {/* Hero Illustration */}
        <View style={styles.heroContainer}>
          {/* Background tonal layers */}
          <View style={[styles.bgLayer1]} />
          <View style={[styles.bgLayer2]} />

          {/* Main image */}
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfxAYdVNTUoo3-WJHs1cXmZ7wRvmXFCeJx-eLjGWk_tLLB4LpzqEjtJ2PmD_JMweZiiFQ6rM-3xXS85LDLA0MQN6NvFburACf35TR3sc1kvH089nlt57ptrPLYZq0_mkRe-gT-GTTgW-iESSd49PC5RG3P2zqcZDex72jWiU5yCKbZM7V6Wo5RqCEMNyb4E76pI5A30VHPvj--B-av8mrb6hvLDXPmWKOpbMoSKWcwYUDUcRaAZ9NW_ArwuwqcGrKCmj0UMcm6HI4',
                cache: 'force-cache',
              }}
              style={styles.heroImage}
              resizeMode="cover"
              fadeDuration={0}
            />
            {/* Glassmorphism overlay card */}
            <View style={styles.overlayCard}>
              <View style={styles.overlayIconCircle}>
                <MaterialIcons name="translate" size={24} color={colors.onSecondaryContainer} />
              </View>
              <View>
                <Text style={styles.overlaySubtitle}>Culture First</Text>
                <Text style={styles.overlayText}>Mirembe — Welcome</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textSection}>
          <Text style={styles.heroTitle}>
            Translate and Preserve{' '}
            <Text style={styles.heroTitleAccent}>Maragoli</Text>
            {' '}Language
          </Text>
          <Text style={styles.heroBody}>
            Join our community in bridging languages and cultures. Learn, speak, and save the rich
            heritage of the Lulogooli people.
          </Text>
        </View>

      </ScrollView>

      {/* Footer Actions */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <TouchableOpacity
          onPress={() => navigation.replace('Main')}
          activeOpacity={0.9}
          style={styles.primaryBtnWrapper}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryContainer]}
            style={styles.primaryBtn}
          >
            <Text style={styles.primaryBtnText}>Get Started</Text>
            <MaterialIcons name="arrow-forward" size={22} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('Main')}
          activeOpacity={0.7}
          style={styles.secondaryBtn}
        >
          <Text style={styles.secondaryBtnText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  brandTitle: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 22,
    color: colors.primary,
    letterSpacing: -0.5,
  },
  heroContainer: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    alignSelf: 'center',
    marginBottom: 48,
    position: 'relative',
  },
  bgLayer1: {
    position: 'absolute',
    inset: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    transform: [{ rotate: '-6deg' }, { scale: 0.95 }],
    opacity: 0.5,
  },
  bgLayer2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    transform: [{ rotate: '3deg' }, { scale: 0.95 }],
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlayCard: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: 'rgba(251, 251, 226, 0.85)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  overlayIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  overlaySubtitle: {
    fontFamily: 'Lexend_600SemiBold',
    fontSize: 10,
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  overlayText: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 14,
    color: colors.onSurface,
    marginTop: 2,
  },
  textSection: {
    gap: 16,
    marginBottom: 48,
  },
  heroTitle: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 36,
    color: colors.primary,
    lineHeight: 44,
    letterSpacing: -1,
  },
  heroTitleAccent: {
    color: colors.secondary,
  },
  heroBody: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 17,
    color: colors.onSurfaceVariant,
    lineHeight: 26,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  progressTrack: {
    flex: 1,
    height: 12,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressFill: {
    width: '33%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 9999,
  },
  progressLabel: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 12,
    color: colors.primary,
  },
  footer: {
    paddingHorizontal: 32,
    paddingTop: 32,
    gap: 16,
  },
  primaryBtnWrapper: {
    borderRadius: 9999,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  primaryBtnText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 18,
    color: '#fff',
  },
  secondaryBtn: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 9999,
  },
  secondaryBtnText: {
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 15,
    color: colors.primary,
  },
});
