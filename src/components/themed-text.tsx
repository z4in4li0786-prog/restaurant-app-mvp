
import {
  StyleSheet,
  Text,
  type TextProps,
} from 'react-native';

type ThemedTextProps = TextProps & {
  variant?: 'default' | 'title' | 'subtitle' | 'caption';
};

export default function ThemedText({
  style,
  variant = 'default',
  ...props
}: ThemedTextProps) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        variant === 'title' && styles.title,
        variant === 'subtitle' && styles.subtitle,
        variant === 'caption' && styles.caption,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: '#222222',
    fontSize: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  caption: {
    fontSize: 13,
    color: '#777777',
  },
});
