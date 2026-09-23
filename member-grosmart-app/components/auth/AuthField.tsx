import { Platform, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { Brand } from '@/constants/theme';

type Props = TextInputProps & {
  label: string;
  hint?: string;
};

export default function AuthField({ label, hint, style, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#9AA8A1"
        style={[styles.input, style]}
        {...rest}
      />
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D5DFDA',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 16,
    color: '#1A1A1A',
    backgroundColor: '#FAFCFB',
  },
  hint: {
    fontSize: 12,
    color: Brand.textMuted,
    lineHeight: 17,
  },
});
