import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import TranslateScreen from '../screens/TranslateScreen';
import TextTranslateScreen from '../screens/TextTranslateScreen';
import SavedScreen from '../screens/SavedScreen';
import ContributionScreen from '../screens/ContributionScreen';
import SettingsScreen from '../screens/SettingsScreen';
import OfflineScreen from '../screens/OfflineScreen';

const Stack = createNativeStackNavigator();

/**
 * MainNavigator sits inside a custom tab layout where each tab
 * screen drives its own BottomNavBar, passing navigation down.
 * This gives us full control over the floating, rounded tab bar.
 */
function MainNavigator() {
  const InnerStack = createNativeStackNavigator();
  return (
    <InnerStack.Navigator screenOptions={{ headerShown: false }}>
      <InnerStack.Screen name="Home" component={HomeScreen} />
      <InnerStack.Screen name="Translate" component={TextTranslateScreen} />
      <InnerStack.Screen name="TranslateResult" component={TranslateScreen} />
      <InnerStack.Screen name="Saved" component={SavedScreen} />
      <InnerStack.Screen name="Settings" component={SettingsScreen} />
      <InnerStack.Screen name="Contribution" component={ContributionScreen} />
      <InnerStack.Screen name="Offline" component={OfflineScreen} />
    </InnerStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
