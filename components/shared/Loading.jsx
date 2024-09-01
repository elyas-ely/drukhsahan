import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

export default function Loading() {
  const { colors } = useTheme();
  return (
    <View style={styles.overlay}>
      <View
        style={{ backgroundColor: colors.secondaryBackground }}
        className="rounded-lg p-5  "
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
