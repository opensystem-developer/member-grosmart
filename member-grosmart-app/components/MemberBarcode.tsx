import { StyleSheet, Text, View } from 'react-native';
import Barcode from 'react-native-barcode-svg';

type Props = {
  value: string;
  maxWidth: number;
  compact?: boolean;
  variant?: 'panel' | 'strip';
};

export default function MemberBarcode({
  value,
  maxWidth,
  compact = false,
  variant = 'panel',
}: Props) {
  const barHeight = compact ? 40 : variant === 'strip' ? 52 : 64;

  const barcode = (
    <View style={styles.barcodeWrap}>
      <Barcode
        value={value}
        format="CODE128"
        maxWidth={maxWidth}
        height={barHeight}
        singleBarWidth={variant === 'strip' ? 1.8 : 2}
        lineColor="#111"
        backgroundColor="#fff"
      />
    </View>
  );

  if (variant === 'strip') {
    return (
      <View style={styles.strip}>
        {barcode}
        <Text style={styles.stripCode}>{value}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.box, compact && styles.boxCompact]}>
      <Text style={styles.caption}>Scan barcode di kasir</Text>
      {barcode}
      <Text style={styles.code}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  boxCompact: {
    paddingVertical: 12,
  },
  caption: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  barcodeWrap: {
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  code: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#111',
  },
  strip: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 6,
  },
  stripCode: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#111',
  },
});
