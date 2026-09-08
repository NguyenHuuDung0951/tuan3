import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

type Product = {
  id: string;
  name: string;
  price: number;
};

type ProductItemProps = {
  item: Product;
  onSelect: (product: Product) => void;
};

const ProductItem = memo(function ProductItem({ item, onSelect }: ProductItemProps) {
  return (
    <Button
      title={`${item.name} - ${item.price.toLocaleString('vi-VN')}đ`}
      onPress={() => onSelect(item)}
    />
  );
});

export default function ProductScreen() {
  const [keyword, setKeyword] = useState('');
  const [selectedName, setSelectedName] = useState('');

  const products = useMemo(
    () => [
      { id: '1', name: 'Áo thun', price: 200000 },
      { id: '2', name: 'Quần jean', price: 450000 },
      { id: '3', name: 'Giày thể thao', price: 800000 },
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return products.filter(product =>
      product.name.toLowerCase().includes(normalizedKeyword)
    );
  }, [keyword, products]);

  const totalPrice = useMemo(
    () => filteredProducts.reduce((total, product) => total + product.price, 0),
    [filteredProducts]
  );

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedName(product.name);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Tìm sản phẩm"
        style={styles.input}
      />

      <Text>Sản phẩm đã chọn: {selectedName || 'Chưa chọn'}</Text>
      <Text>Tổng giá: {totalPrice.toLocaleString('vi-VN')}đ</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductItem item={item} onSelect={handleSelectProduct} />
        )}
        ListEmptyComponent={<Text>Không tìm thấy sản phẩm</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
    padding: 12,
  },
});
