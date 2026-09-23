import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useMember } from '@/context/MemberContext';
import { Brand } from '@/constants/theme';

export default function Index() {
  const { member, isLoading } = useMember();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Brand.primary} />
      </View>
    );
  }

  if (!member) {
    return <Redirect href="/welcome" />;
  }

  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Brand.surface,
  },
});
