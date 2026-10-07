
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import type { MenuItem } from '../../data/menu';

type MenuItemCardProps = {
  item: MenuItem;
  onAdd: () => void;
};

export default function MenuItemCard({
  item,
  onAdd,
}: MenuItemCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>
          {item.emoji}
        </Text>
      </View>

      <View style={styles.content}>
        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {item.name}
        </Text>

        <Text
          style={styles.description}
          numberOfLines={2}
        >
          {item.description}
        </Text>

        <Text style={styles.price}>
          Rs. {item.price}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={onAdd}
        activeOpacity={0.8}
      >
        <Text style={styles.addText}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  emojiContainer: {
    width: 65,
    height: 65,
    borderRadius: 14,
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emoji: {
    fontSize: 32,
  },

  content: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: '800',
    color: '#222222',
  },

  description: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
    lineHeight: 17,
  },

  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#E85D04',
    marginTop: 7,
  },

  addButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E85D04',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '500',
    lineHeight: 28,
  },
});

