import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Clipboard,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import BottomNavBar from '../components/BottomNavBar';

export default function TranslateScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();

  const {
    sourceText    = '',
    translation   = '',
    notes         = '',
    wordBreakdown = [],
    fromLang      = 'maragoli',
    toLang        = 'english',
  } = route.params || {};

  const fromLabel = fromLang === 'maragoli' ? 'MARAGOLI' : 'ENGLISH';
  const toLabel   = toLang   === 'maragoli' ? 'MARAGOLI' : 'ENGLISH';

  function copyToClipboard() {
    Clipboard.setString(translation);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Copied!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied', 'Translation copied to clipboard.');
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* TopAppBar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#2D5A27" />
        </TouchableOpacity>
        <Text style={styles.appTitle}>Translation</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Translation Card */}
        <View style={styles.translationCard}>
          {/* Language Indicator Row */}
          <View style={styles.langRow}>
            <View style={styles.langBadgeActive}>
              <Text style={styles.langBadgeActiveText}>{fromLabel}</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={20} color={colors.outline} />
            <View style={styles.langBadgeInactive}>
              <Text style={styles.langBadgeInactiveText}>{toLabel}</Text>
            </View>
          </View>

          {/* Translation Content */}
          <View style={styles.translationContent}>
            {/* Source Text */}
            <Text style={styles.sourceText}>"{sourceText}"</Text>

            {/* Separator */}
            <View style={styles.separator} />

            {/* Result Text */}
            <Text style={styles.resultText}>{translation}</Text>
          </View>

          {/* Action Bar */}
          <View style={styles.actionBar}>
            <View style={styles.actionBtnGroup}>
              <TouchableOpacity style={styles.actionIconBtn} activeOpacity={0.7} onPress={copyToClipboard}>
                <MaterialIcons name="content-copy" size={22} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionIconBtn} activeOpacity={0.7}>
                <MaterialIcons name="bookmark-border" size={22} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Cultural Notes */}
        {notes ? (
          <View style={styles.contextCard}>
            <MaterialIcons name="lightbulb-outline" size={20} color={colors.secondary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.contextCardLabel}>Cultural Note</Text>
              <Text style={styles.contextCardText}>{notes}</Text>
            </View>
          </View>
        ) : null}

        {/* Word Breakdown */}
        {wordBreakdown && wordBreakdown.length > 0 ? (
          <View style={styles.breakdownCard}>
            <Text style={styles.breakdownTitle}>Word Breakdown</Text>
            {wordBreakdown.map((item, index) => (
              <View key={index} style={styles.breakdownRow}>
                <Text style={styles.breakdownWord}>{item.word}</Text>
                <Text style={styles.breakdownMeaning}>{item.meaning}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Translate Again */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
          style={styles.translateBtnWrapper}
        >
          <LinearGradient
            colors={['#154212', '#2d5a27']}
            style={styles.translateBtn}
          >
            <MaterialIcons name="translate" size={18} color="#fff" />
            <Text style={styles.translateBtnText}>Translate Another</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>

      <BottomNavBar activeTab="Translate" navigation={navigation} />
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
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 16,
  },
  translationCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  langBadgeActive: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  langBadgeActiveText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 11,
    color: colors.onSecondaryContainer,
    letterSpacing: 1,
  },
  langBadgeInactive: {
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  langBadgeInactiveText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 11,
    color: colors.primary,
    letterSpacing: 1,
  },
  translationContent: {
    gap: 24,
    marginBottom: 32,
  },
  sourceText: {
    fontFamily: 'BeVietnamPro_300Light',
    fontSize: 17,
    color: colors.onSurfaceVariant,
    lineHeight: 26,
    fontStyle: 'italic',
  },
  separator: {
    height: 2,
    width: 48,
    backgroundColor: 'rgba(161, 212, 148, 0.3)',
  },
  resultText: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 34,
    color: colors.primary,
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionBtnGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  actionIconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contextCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 20,
  },
  contextCardLabel: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 11,
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  contextCardText: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
  },
  breakdownCard: {
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  breakdownTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 11,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(194, 201, 187, 0.2)',
  },
  breakdownWord: {
    fontFamily: 'Lexend_600SemiBold',
    fontSize: 15,
    color: colors.primary,
  },
  breakdownMeaning: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    color: colors.onSurfaceVariant,
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  translateBtnWrapper: {
    borderRadius: 9999,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  translateBtn: {
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  translateBtnText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 16,
    color: '#fff',
  },
});
