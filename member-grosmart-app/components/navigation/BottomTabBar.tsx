import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Brand } from '@/constants/theme';

type TabIconName = keyof typeof TAB_ICONS;

const TAB_ICONS = {
  index: { active: 'card', inactive: 'card-outline' },
  riwayat: { active: 'star', inactive: 'star-outline' },
  profil: { active: 'person', inactive: 'person-outline' },
} as const satisfies Record<string, { active: string; inactive: string }>;

function iconName(routeName: string, focused: boolean): keyof typeof Ionicons.glyphMap {
  const config = TAB_ICONS[routeName as TabIconName];
  if (!config) {
    return focused ? 'ellipse' : 'ellipse-outline';
  }
  const name = focused ? config.active : config.inactive;
  return name as keyof typeof Ionicons.glyphMap;
}

export default function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 10);

  return (
    <View style={[styles.shell, { paddingBottom: bottomPad }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? String(options.tabBarLabel)
              : options.title !== undefined
                ? options.title
                : route.name;

          const focused = state.index === index;
          const color = focused ? Brand.primary : '#8E8E93';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? String(label)}
              onPress={onPress}
              onLongPress={onLongPress}
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}>
              <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
                <Ionicons name={iconName(route.name, focused)} size={22} color={color} />
              </View>
              <Text style={[styles.label, { color }, focused && styles.labelActive]} numberOfLines={1}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 12,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingHorizontal: 8,
    minHeight: 56,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 4,
  },
  itemPressed: {
    opacity: 0.75,
  },
  iconWrap: {
    width: 40,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: Brand.accentSoft,
  },
  label: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  labelActive: {
    fontWeight: '700',
  },
});
