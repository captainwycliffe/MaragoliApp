import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import BottomNavBar from '../components/BottomNavBar';

const WAVEFORM_BARS = [
  { delay: 100, opacity: 0.2 },
  { delay: 300, opacity: 0.4 },
  { delay: 500, opacity: 0.6 },
  { delay: 200, opacity: 1.0 },
  { delay: 400, opacity: 0.8 },
  { delay: 600, opacity: 0.5 },
  { delay: 100, opacity: 0.2 },
];

function WaveformBar({ delay, opacity }) {
  const anim = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 32,
          duration: 600,
          delay,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(anim, {
          toValue: 8,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.waveBar,
        {
          height: anim,
          backgroundColor: `rgba(21, 66, 18, ${opacity})`,
        },
      ]}
    />
  );
}

export default function VoiceScreen({ navigation }) {
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
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <MaterialIcons name="history" size={24} color="#2D5A27" />
        </TouchableOpacity>
      </View>

      {/* Language Selector */}
      <View style={styles.langSelector}>
        <View style={styles.langItem}>
          <Text style={styles.langLabel}>FROM</Text>
          <Text style={styles.langName}>English</Text>
        </View>
        <View style={styles.swapCircle}>
          <MaterialIcons name="swap-horiz" size={24} color={colors.onSecondaryContainer} />
        </View>
        <View style={[styles.langItem, styles.langItemRight]}>
          <Text style={styles.langLabel}>TO</Text>
          <Text style={styles.langName}>Maragoli</Text>
        </View>
      </View>

      {/* Live Transcription Area */}
      <View style={styles.transcriptionArea}>
        {/* Ghost text */}
        <Text style={styles.ghostText}>
          "I would like to visit my grandmother this weekend in the village."
        </Text>

        {/* Live Result Card */}
        <View style={styles.liveCard}>
          {/* LIVE indicator */}
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <Text style={styles.liveCardLabel}>Transcribing Maragoli</Text>
          <Text style={styles.liveTranscription}>Ndi nagonza okuchira kuku...</Text>

          {/* Waveform */}
          <View style={styles.waveform}>
            {WAVEFORM_BARS.map((bar, i) => (
              <WaveformBar key={i} delay={bar.delay} opacity={bar.opacity} />
            ))}
          </View>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {/* Secondary Actions */}
        <View style={styles.secondaryActions}>
          <TouchableOpacity style={styles.controlBtn} activeOpacity={0.7}>
            <View style={styles.controlBtnCircle}>
              <MaterialIcons name="play-arrow" size={24} color={colors.onSurfaceVariant} />
            </View>
            <Text style={styles.controlBtnLabel}>START</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} activeOpacity={0.7}>
            <View style={styles.controlBtnCircle}>
              <MaterialIcons name="stop" size={24} color={colors.error} />
            </View>
            <Text style={styles.controlBtnLabel}>STOP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} activeOpacity={0.7}>
            <View style={styles.controlBtnCircle}>
              <MaterialIcons name="translate" size={24} color={colors.secondary} />
            </View>
            <Text style={styles.controlBtnLabel}>TRANSLATE</Text>
          </TouchableOpacity>
        </View>

        {/* Primary Mic Button */}
        <View style={styles.micWrapper}>
          <TouchableOpacity activeOpacity={0.9} style={styles.micBtnWrapper}>
            <LinearGradient
              colors={['#154212', '#2d5a27']}
              style={styles.micBtn}
            >
              <MaterialIcons name="mic" size={48} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom padding for nav */}
      <View style={{ height: 100 }} />

      <BottomNavBar activeTab="Voice" navigation={navigation} />
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
  langSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    marginHorizontal: 24,
    padding: 16,
    marginBottom: 32,
  },
  langItem: {
    gap: 2,
  },
  langItemRight: {
    alignItems: 'flex-end',
  },
  langLabel: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  langName: {
    fontFamily: 'Lexend_600SemiBold',
    fontSize: 16,
    color: colors.primary,
  },
  swapCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  transcriptionArea: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
  ghostText: {
    fontFamily: 'BeVietnamPro_300Light',
    fontSize: 15,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 280,
  },
  liveCard: {
    width: '100%',
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 24,
    padding: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  liveIndicator: {
    position: 'absolute',
    top: 12,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary,
  },
  liveText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 10,
    color: colors.secondary,
    letterSpacing: -0.5,
  },
  liveCardLabel: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 11,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  liveTranscription: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 22,
    color: colors.primary,
    lineHeight: 30,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 24,
    height: 40,
  },
  waveBar: {
    width: 6,
    borderRadius: 3,
  },
  controls: {
    paddingHorizontal: 24,
    paddingTop: 32,
    gap: 48,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlBtn: {
    alignItems: 'center',
    gap: 8,
  },
  controlBtnCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtnLabel: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 10,
    color: colors.onSurfaceVariant,
    letterSpacing: 1.5,
  },
  micWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
    position: 'relative',
  },
  micBtnWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  micBtn: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
