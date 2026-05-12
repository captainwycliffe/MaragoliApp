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
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import BottomNavBar from '../components/BottomNavBar';

const CACHED_TRANSLATIONS = [
  { id: 1, english: 'Good Morning', maragoli: 'Mirembe', pinned: true },
  { id: 2, english: 'How are you doing today?', maragoli: 'Muli muli muno?', pinned: true },
  { id: 3, english: 'Thank you very much', maragoli: 'Asante muno', pinned: true },
];

export default function OfflineScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* TopAppBar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <MaterialIcons name="menu" size={24} color="#2D5A27" />
          </TouchableOpacity>
          <Text style={styles.appTitle}>Maragoli Translate</Text>
        </View>
        <MaterialIcons name="cloud-off" size={22} color={colors.onSurfaceVariant} style={{ opacity: 0.5 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Offline Status Banner */}
        <View style={styles.offlineBanner}>
          <View style={styles.offlineBannerIcon}>
            <MaterialIcons name="signal-wifi-off" size={24} color={colors.onSurfaceVariant} />
          </View>
          <View style={styles.offlineBannerText}>
            <Text style={styles.offlineBannerTitle}>Offline Mode Active</Text>
            <Text style={styles.offlineBannerSubtitle}>
              You're currently disconnected. Voice and real-time features are limited to cached data.
            </Text>
          </View>
        </View>

        {/* Translation Input Area (Disabled State) */}
        <View style={styles.translationCard}>
          <View style={styles.translationCardLangRow}>
            <TouchableOpacity style={styles.langPickerBtn} activeOpacity={0.7}>
              <Text style={styles.langPickerText}>English</Text>
              <MaterialIcons name="expand-more" size={16} color={colors.primary} />
            </TouchableOpacity>
            <MaterialIcons name="swap-horiz" size={24} color={colors.outline} />
            <TouchableOpacity style={styles.langPickerBtn} activeOpacity={0.7}>
              <Text style={styles.langPickerText}>Lulogooli</Text>
              <MaterialIcons name="expand-more" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.translationCardEmpty}>
            <MaterialIcons name="edit" size={36} color="rgba(66,73,62,0.4)" />
            <Text style={styles.translationCardEmptyTitle}>Enter text to translate</Text>
            <Text style={styles.translationCardEmptySubtitle}>
              Available for offline Maragoli dictionary
            </Text>
          </View>
        </View>

        {/* Limited Functionality Bento */}
        <View style={styles.limitedGrid}>
          <View style={[styles.limitedCard, { opacity: 0.5 }]}>
            <MaterialIcons name="mic" size={30} color={colors.primary} />
            <View style={styles.limitedCardText}>
              <Text style={styles.limitedCardTitle}>Voice</Text>
              <Text style={styles.limitedCardSubtitle}>
                Connection required for voice processing
              </Text>
            </View>
          </View>
          <View style={[styles.limitedCard, { opacity: 0.5 }]}>
            <MaterialIcons name="photo-camera" size={30} color={colors.primary} />
            <View style={styles.limitedCardText}>
              <Text style={styles.limitedCardTitle}>Camera</Text>
              <Text style={styles.limitedCardSubtitle}>
                Visual translation unavailable offline
              </Text>
            </View>
          </View>
        </View>

        {/* Cached Translations */}
        <View style={styles.cachedSection}>
          <View style={styles.cachedHeader}>
            <Text style={styles.cachedTitle}>Cached Translations</Text>
            <Text style={styles.cachedLabel}>RECENT</Text>
          </View>
          <View style={styles.cachedList}>
            {CACHED_TRANSLATIONS.map((item) => (
              <View key={item.id} style={styles.cacheCard}>
                <View style={styles.cacheCardContent}>
                  <Text style={styles.cacheCardLangLabel}>English</Text>
                  <Text style={styles.cacheCardSource}>{item.english}</Text>
                  <View style={styles.cacheCardDivider} />
                  <Text style={styles.cacheCardLangLabel}>Lulogooli</Text>
                  <Text style={styles.cacheCardResult}>{item.maragoli}</Text>
                </View>
                <MaterialIcons name="bookmark" size={22} color={colors.outlineVariant} />
              </View>
            ))}
          </View>
        </View>

        {/* Download CTA */}
        <View style={styles.downloadSection}>
          <View style={styles.downloadImageWrapper}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArvaJz-PoXpuhE_qEOXYhrqsa469Qu_29pxj4sv8RIP4hSX0S1OqzCDA_O46gIsFnoOfUcc-HifYLT6I_rV58agzb0EFxH7Yb2Mar0EzjxJc_1aNlrhr0u6ceWJUUGGNCCADjnAZcRnCckRRTojLWe46Z_mhyNl0aDkMhfZ-bSLWPTp7fU_7ecsC4v5dj7tdlrkawBy8y08lNIr4TwgVo-6GUpiU4zaXIfF7xPN6rBV6F8A7am97mq49hH-HBwZV6AgVixFmYMDLQ',
              }}
              style={styles.downloadImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.downloadText}>
            Download the full Lulogooli language pack to translate 2,000+ words offline.
          </Text>
          <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.85}>
            <MaterialIcons name="file-download" size={18} color="#fff" />
            <Text style={styles.downloadBtnText}>GET LANGUAGE PACK</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 120 }} />
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 24,
  },
  offlineBanner: {
    backgroundColor: colors.surfaceDim,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.outline,
  },
  offlineBannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineBannerText: {
    flex: 1,
    gap: 4,
  },
  offlineBannerTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 17,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
  },
  offlineBannerSubtitle: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 13,
    color: colors.onSurfaceVariant,
    opacity: 0.8,
    lineHeight: 18,
  },
  translationCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(194, 201, 187, 0.1)',
  },
  translationCardLangRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  langPickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceContainer,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
  },
  langPickerText: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 14,
    color: colors.primary,
  },
  translationCardEmpty: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  translationCardEmptyTitle: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 15,
    color: 'rgba(66,73,62,0.4)',
  },
  translationCardEmptySubtitle: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    color: 'rgba(66,73,62,0.4)',
  },
  limitedGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  limitedCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 20,
    gap: 12,
    justifyContent: 'space-between',
  },
  limitedCardText: {
    gap: 4,
  },
  limitedCardTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 13,
  },
  limitedCardSubtitle: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 10,
    lineHeight: 15,
    color: colors.onSurfaceVariant,
  },
  cachedSection: {
    gap: 16,
  },
  cachedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cachedTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 20,
    color: colors.primary,
    letterSpacing: -0.3,
  },
  cachedLabel: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 11,
    color: colors.secondary,
    letterSpacing: 2,
  },
  cachedList: {
    gap: 12,
  },
  cacheCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cacheCardContent: {
    gap: 4,
  },
  cacheCardLangLabel: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 11,
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cacheCardSource: {
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 15,
    color: colors.onSurface,
  },
  cacheCardDivider: {
    height: 1,
    width: 16,
    backgroundColor: colors.outlineVariant,
    marginVertical: 8,
  },
  cacheCardResult: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 18,
    color: colors.primary,
  },
  downloadSection: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 24,
  },
  downloadImageWrapper: {
    width: '100%',
    height: 192,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerHigh,
  },
  downloadImage: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  downloadText: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 240,
    lineHeight: 20,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 9999,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  downloadBtnText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 14,
    color: colors.onPrimary,
    letterSpacing: 1,
  },
});
