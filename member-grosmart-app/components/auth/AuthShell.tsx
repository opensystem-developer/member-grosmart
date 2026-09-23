import { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/constants/theme';

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthShell({ title, subtitle, children }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Text style={styles.logo}>GrosMart</Text>
            <Text style={styles.heroTitle}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.card}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Brand.surface,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
    gap: 18,
  },
  hero: {
    gap: 6,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: Brand.primary,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: Brand.textMuted,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    gap: 12,
  },
});
