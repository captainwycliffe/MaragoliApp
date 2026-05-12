import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { API_BASE_URL } from '../constants/api';
import BottomNavBar from '../components/BottomNavBar';

export default function TextTranslateScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [fromLang, setFromLang] = useState('maragoli');
  const [toLang, setToLang]     = useState('english');
  const [inputText, setInputText]   = useState('');
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]           = useState('');

  const fromLabel = fromLang === 'maragoli' ? 'Maragoli' : 'English';
  const toLabel   = toLang   === 'maragoli' ? 'Maragoli' : 'English';
  const placeholder =
    fromLang === 'maragoli' ? 'Andika madi hano...' : 'Type your text here...';

  function handleSwap() {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText('');
    setError('');
  }

  async function handleTranslate() {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText.trim(), from: fromLang, to: toLang }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Translation failed. Please try again.');
        return;
      }

      navigation.navigate('TranslateResult', {
        sourceText: inputText.trim(),
        translation: data.translation,
        notes: data.notes,
        wordBreakdown: data.wordBreakdown,
        fromLang,
        toLang,
      });
    } catch (err) {
      setError('Could not reach the server. Check your connection.');
    } finally {
      setIsLoading(false);
    }
  }

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
        <View style={styles.accountCircle}>
          <MaterialIcons name="account-circle" size={24} color={colors.onSecondaryContainer} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Language Selector */}
        <View style={styles.langSelectorBar}>
          <View style={styles.langPill}>
            <Text style={styles.langPillText}>{fromLabel}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.9} onPress={handleSwap}>
            <LinearGradient
              colors={['#154212', '#2d5a27']}
              style={styles.swapBtn}
            >
              <MaterialIcons name="swap-horiz" size={24} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.langPill}>
            <Text style={styles.langPillText}>{toLabel}</Text>
          </View>
        </View>

        {/* Input Area */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>ENTER {fromLabel.toUpperCase()} TEXT</Text>
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor={colors.outlineVariant}
            multiline
            value={inputText}
            onChangeText={setInputText}
            textAlignVertical="top"
          />
          {inputText.length > 0 && (
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => { setInputText(''); setError(''); }}
              activeOpacity={0.7}
            >
              <MaterialIcons name="close" size={18} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          )}
        </View>

        {/* Error */}
        {error ? (
          <View style={styles.errorBox}>
            <MaterialIcons name="error-outline" size={18} color={colors.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Translate Button */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleTranslate}
          disabled={isLoading || !inputText.trim()}
          style={[styles.translateBtnWrapper, (!inputText.trim()) && styles.translateBtnDisabled]}
        >
          <LinearGradient
            colors={inputText.trim() ? ['#154212', '#2d5a27'] : ['#aaa', '#999']}
            style={styles.translateBtn}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.translateBtnText}>Translate</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Illustration */}
        <View style={styles.illustration}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5asvDD4TvZRfPYqXpDMGcKz8rUMTpsAiBj-11-aRGQFwtBnRGzUk5fafeLKL5xtjzuKRhnWCRTOzA40v57_3wMu-WI8S_z9Hyyq5uyoxDF6Aktp8VlNtAkyOOhaPqxLGTI3JfUfvYmOJZj24okT74kmBsXJ2JgVE3NKwZMSL2FPk2XPTvGsZhnQz4eU9Sz7r-mHnQaj3qJbXPbPvMJcMVO5gdeDLupMhynH94reb7E-TM88WrEErQJJdNyW0xqd4UiYNx2Y3ZUjo',
              cache: 'force-cache',
            }}
            style={styles.illustrationImage}
            resizeMode="cover"
            fadeDuration={0}
          />
          <LinearGradient
            colors={['transparent', 'rgba(21, 66, 18, 0.6)']}
            style={styles.illustrationOverlay}
          >
            <Text style={styles.illustrationCaption}>
              Rooted in heritage, powered by AI.
            </Text>
          </LinearGradient>
        </View>

      </ScrollView>

      <BottomNavBar activeTab="Translate" navigation={navigation} />
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
  accountCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 96,
    gap: 24,
  },
  langSelectorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  langPill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 9999,
  },
  langPillText: {
    fontFamily: 'Lexend_600SemiBold',
    fontSize: 14,
    color: colors.primary,
  },
  swapBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  inputCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 24,
    padding: 24,
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  inputLabel: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 11,
    color: colors.secondary,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 17,
    color: colors.onSurface,
    minHeight: 80,
    padding: 0,
  },
  clearBtn: {
    alignSelf: 'flex-end',
    marginTop: 12,
    padding: 4,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(186,26,26,0.08)',
    borderRadius: 12,
    padding: 14,
  },
  errorText: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 13,
    color: colors.error,
    flex: 1,
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
  translateBtnDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  translateBtn: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  translateBtnText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 16,
    color: '#fff',
  },
  illustration: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  illustrationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  illustrationCaption: {
    fontFamily: 'Lexend_500Medium',
    fontSize: 12,
    color: '#fff',
  },
});
