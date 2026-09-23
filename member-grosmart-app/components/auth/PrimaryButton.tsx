import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { Brand } from '@/constants/theme';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'ghost';
};

export default function PrimaryButton({
  label,
  onPress,
  loading,
  disabled,
  variant = 'primary',
}: Props) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.ghost,
        (pressed || disabled) && styles.pressed,
      ]}>
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#fff' : Brand.primary} />
      ) : (
        <Text style={[styles.text, !isPrimary && styles.ghostText]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: Brand.primary,
  },
  ghost: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Brand.primary,
  },
  pressed: {
    opacity: 0.88,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  ghostText: {
    color: Brand.primary,
  },
});
