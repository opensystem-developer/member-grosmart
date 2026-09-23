import { Tabs } from 'expo-router';

import BottomTabBar from '@/components/navigation/BottomTabBar';
import { Brand } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={({ state, descriptors, navigation }) => (
        <BottomTabBar state={state} descriptors={descriptors} navigation={navigation} />
      )}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Brand.primary,
        tabBarInactiveTintColor: '#8E8E93',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Kartu',
          tabBarLabel: 'Kartu',
        }}
      />
      <Tabs.Screen
        name="riwayat"
        options={{
          title: 'Poin',
          tabBarLabel: 'Poin',
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarLabel: 'Profil',
        }}
      />
    </Tabs>
  );
}
