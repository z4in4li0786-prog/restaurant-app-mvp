
import {
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';

type ThemedViewProps = ViewProps & {
  variant?: 'default' | 'card';
};

export default function ThemedView({
  style,
  variant = 'default',
  ...props
}: ThemedViewProps) {
  return (
    <View
      {...props}
      style={[
        styles.base,
        variant === 'card' && styles.card,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#F8F8F8',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
});
