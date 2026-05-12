import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import BottomNavBar from '../components/BottomNavBar';

export default function ContributionScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [maragoliPhrase, setMaragoliPhrase] = useState('');
  const [englishTranslation, setEnglishTranslation] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setShowSuccess(true);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* TopAppBar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <MaterialIcons name="menu" size={24} color="#2D5A27" />
          </TouchableOpacity>
          <Text style={styles.appTitle}>Maragoli Translate</Text>
        </View>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwnJyG5zX9Qy3d3EheZnoUfzYG17zTMaGtW28-1JOz0-k2g8-MHtTqurCgyCsj5L7iBrBBdrog5CRecpSgD6tHQK-y2_0zWMeNF3LuHnDEnlBCCcllC4RdhHooZhgCXbjtzyTll1v-mGjs1ioiKE4OAdwLp1n0EB3G_qQ-GEWA9T92pIhTtnNI9QDQsVkdXJiFsLNOhCV6jjUsGKQSjl73mtLT2lfqC-R43Kscc1ruo1tvF40fqDtjvslirb6pOG7xe7z91QTWMro',
            }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Share Your Knowledge</Text>
          <Text style={styles.heroSubtitle}>
            Help preserve the Maragoli language by contributing phrases to our community dictionary.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Maragoli Input */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>MARAGOLI PHRASE</Text>
            <TextInput
              style={styles.fieldInput}
              placeholder="e.g. Mulembe muno"
              placeholderTextColor={colors.outlineVariant}
              value={maragoliPhrase}
              onChangeText={setMaragoliPhrase}
            />
          </View>

          {/* English Translation */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>ENGLISH TRANSLATION</Text>
            <TextInput
              style={styles.fieldInput}
              placeholder="e.g. Good morning"
              placeholderTextColor={colors.outlineVariant}
              value={englishTranslation}
              onChangeText={setEnglishTranslation}
            />
          </View>

          {/* Voice Recording */}
          <View style={styles.voiceCard}>
            <View style={styles.voiceCardLeft}>
              <Text style={styles.voiceCardTitle}>Voice Recording</Text>
              <Text style={styles.voiceCardSubtitle}>
                Optional: Add audio for pronunciation
              </Text>
            </View>
            <TouchableOpacity style={styles.voiceMicBtn} activeOpacity={0.8}>
              <MaterialIcons name="mic" size={24} color={colors.onSecondaryContainer} />
            </TouchableOpacity>
          </View>
          <View style={styles.voiceProgress}>
            <View style={styles.voiceProgressFill} />
          </View>

          {/* Submit Button */}
          <View style={styles.submitSection}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleSubmit}
              style={styles.submitBtnWrapper}
            >
              <LinearGradient
                colors={['#154212', '#2d5a27']}
                style={styles.submitBtn}
              >
                <Text style={styles.submitBtnText}>Submit Contribution</Text>
                <MaterialIcons name="send" size={22} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            {/* Success Message */}
            {showSuccess && (
              <View style={styles.successCard}>
                <View style={styles.successIcon}>
                  <MaterialIcons name="check" size={16} color="#fff" />
                </View>
                <View style={styles.successText}>
                  <Text style={styles.successTitle}>Asante sana!</Text>
                  <Text style={styles.successBody}>
                    Your contribution has been saved and is being reviewed by the community.
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Community Card */}
        <View style={styles.communityCard}>
          <View style={styles.avatarStack}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLzyu4Q6JVmGK6aUMT5T8JrQWTW7CFGdpOlHy9vI_XdBOBdSDR68qGR7JAUbjGn85LJ-mUAYU7vfzxAqx8Z7z2qRsi2hYclD2cd7DOR9dEMsZ3Zs2QKZbt-BBCgkhXaov28qAiKB1zNUifZCfgrrKJYbSez1U1Lwto8yEuNKXPxDPCALsCD-Sb2VBJhiSc80Xg0m1hWDIuBEVGP7sjAvd93Fy5A-AVKvhebPFRw--nZpCVVp3Qqkjgma9kJQqxJjn98hnUh8dsSiU',
              }}
              style={[styles.communityAvatar, { zIndex: 3 }]}
            />
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWHCwfp3hEg4GN5AS8wZ3XUkqOcZWW0wg-p5BivWgOKujG7NQtm7Ta9VoPXtitU9pPl33fX-n52N6BgaKdIxueQsk4CPfpblDQjpuNSzCGz4ZDzw79fxI0JKSI6ZjwCKbtNJ8Eo8r7pHm3dhMcLJXFqfVxgraYjDB52Jg2AZ7eJ9QiYQVlmexAGgetfa433P1-sErimGcqMt5Kvmwx_xiVtF54bwz2j9grssVh-hEzhYLgxyA6JEgoJK09lyn0ePEH855YiCdeVdw',
              }}
              style={[styles.communityAvatar, { zIndex: 2, marginLeft: -12 }]}
            />
            <View style={[styles.communityAvatarExtra, { zIndex: 1, marginLeft: -12 }]}>
              <Text style={styles.communityAvatarExtraText}>+8k</Text>
            </View>
          </View>
          <Text style={styles.communityText}>
            Join 8,421 contributors preserving the Logooli dialect.
          </Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <BottomNavBar activeTab="Home" navigation={navigation} />
    </KeyboardAvoidingView>
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
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerHigh,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    gap: 24,
  },
  hero: {
    gap: 12,
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 34,
    color: colors.primary,
    letterSpacing: -1,
    lineHeight: 42,
  },
  heroSubtitle: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 17,
    color: colors.onSurfaceVariant,
    lineHeight: 26,
    maxWidth: '90%',
  },
  form: {
    gap: 24,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 12,
    color: colors.secondary,
    letterSpacing: 2,
    paddingLeft: 4,
  },
  fieldInput: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 20,
    color: colors.onSurface,
  },
  voiceCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voiceCardLeft: {
    gap: 4,
  },
  voiceCardTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 15,
    color: colors.onSurface,
  },
  voiceCardSubtitle: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 13,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  voiceMicBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  voiceProgress: {
    height: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 9999,
    overflow: 'hidden',
    marginTop: -16,
  },
  voiceProgressFill: {
    width: 0,
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 9999,
  },
  submitSection: {
    gap: 32,
    paddingTop: 16,
  },
  submitBtnWrapper: {
    borderRadius: 9999,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  submitBtnText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 20,
    color: '#fff',
  },
  successCard: {
    backgroundColor: colors.primaryFixed,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  successIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    flex: 1,
    gap: 4,
  },
  successTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 15,
    color: colors.primary,
  },
  successBody: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 13,
    color: colors.onPrimaryFixedVariant,
    lineHeight: 18,
  },
  communityCard: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.surfaceContainerHigh,
  },
  communityAvatarExtra: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surfaceContainerHigh,
  },
  communityAvatarExtraText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 11,
    color: colors.onPrimaryContainer,
  },
  communityText: {
    flex: 1,
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
});
