import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import BottomNavBar from '../components/BottomNavBar';

const PHRASES = [
  { maragoli: 'Huliri!', english: 'Listen!' },
  { maragoli: 'Kiring\'ana!', english: 'Be quiet! / Silence!' },
  { maragoli: 'Singira ugingi ovogono vuvwo.', english: 'Get up, pick up your mat.' },
  { maragoli: 'Mwetegekize inzira yu Mwami.', english: 'Prepare the way of the Lord.' },
  { maragoli: 'Nyira mukono gugwo!', english: 'Stretch out your hand!' },
  { maragoli: 'Gendi kwambuki kuzie ku lwangereka lundi.', english: 'Let us go over to the other side.' },
  { maragoli: 'Umundu uyu amolomaa ndi kigira ki?', english: 'Why does this man speak like that?' },
];

function PhraseCard({ phrase }) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <View style={styles.phraseCard}>
      <View style={styles.phraseCardTop}>
        <View style={styles.phraseTexts}>
          <Text style={styles.phraseMaragoli}>{phrase.maragoli}</Text>
          <Text style={styles.phraseEnglish}>{phrase.english}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookmarkBtn}
          onPress={() => setBookmarked(!bookmarked)}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={bookmarked ? 'bookmark' : 'bookmark-border'}
            size={24}
            color={bookmarked ? colors.secondary : colors.outline}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function SavedScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');

  const filtered = PHRASES.filter(
    (p) =>
      p.maragoli.toLowerCase().includes(searchText.toLowerCase()) ||
      p.english.toLowerCase().includes(searchText.toLowerCase())
  );

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
          <MaterialIcons name="search" size={24} color="#2D5A27" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Saved Phrases</Text>
          <Text style={styles.pageSubtitle}>Your personal Maragoli library</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons
            name="search"
            size={22}
            color={colors.outline}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your phrases..."
            placeholderTextColor={colors.outline}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Phrases List */}
        <View style={styles.phrasesList}>
          {filtered.map((phrase, index) => (
            <PhraseCard key={index} phrase={phrase} />
          ))}
          {filtered.length === 0 && (
            <Text style={styles.emptyText}>No phrases found.</Text>
          )}
        </View>

        {/* Daily Goal Card */}
        <View style={styles.dailyGoalCard}>
          <View style={styles.dailyGoalContent}>
            <View style={styles.dailyGoalBadge}>
              <Text style={styles.dailyGoalBadgeText}>Daily Goal</Text>
            </View>
            <Text style={styles.dailyGoalTitle}>{'Practice\n5 More Phrases'}</Text>
            <Text style={styles.dailyGoalSubtitle}>
              Keep your streak alive and master the dialect.
            </Text>
            <TouchableOpacity style={styles.practiceBtn} activeOpacity={0.85}>
              <Text style={styles.practiceBtnText}>Practice Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dailyGoalDecor}>
            <MaterialIcons name="translate" size={120} color="rgba(255,255,255,0.1)" />
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <BottomNavBar activeTab="Saved" navigation={navigation} />
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
    gap: 0,
  },
  header: {
    marginBottom: 32,
    marginTop: 8,
    gap: 8,
  },
  pageTitle: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 36,
    color: colors.primary,
    letterSpacing: -1,
    lineHeight: 44,
  },
  pageSubtitle: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 14,
    color: colors.onSurfaceVariant,
    opacity: 0.8,
  },
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 52,
    paddingRight: 16,
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 15,
    color: colors.onSurface,
  },
  phrasesList: {
    gap: 16,
    marginBottom: 48,
  },
  phraseCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    gap: 16,
  },
  phraseCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  phraseTexts: {
    flex: 1,
    gap: 4,
    marginRight: 8,
  },
  phraseMaragoli: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 20,
    color: colors.primary,
    letterSpacing: -0.3,
  },
  phraseEnglish: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 15,
    color: colors.onSurfaceVariant,
  },
  bookmarkBtn: {
    padding: 8,
    borderRadius: 9999,
  },
  emptyText: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    paddingVertical: 32,
  },
  dailyGoalCard: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 32,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 8,
  },
  dailyGoalContent: {
    gap: 8,
    position: 'relative',
    zIndex: 1,
  },
  dailyGoalBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  dailyGoalBadgeText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 10,
    color: colors.onSecondaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  dailyGoalTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 30,
    color: colors.onPrimary,
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  dailyGoalSubtitle: {
    fontFamily: 'BeVietnamPro_500Medium',
    fontSize: 13,
    color: colors.onPrimaryContainer,
    marginBottom: 16,
  },
  practiceBtn: {
    backgroundColor: colors.surface,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  practiceBtnText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 14,
    color: colors.primary,
  },
  dailyGoalDecor: {
    position: 'absolute',
    right: -16,
    bottom: -32,
    opacity: 0.1,
  },
});
