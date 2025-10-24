import React from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import { useLoaderData, useNavigation } from 'react-router-dom';

export function ItemListContainer() {
  const { products } = useLoaderData() || { products: [] };
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <LoadingSpinner />;
  }

  if (!products || products.length === 0) {
    return <p>No hay productos disponibles</p>;
  }

  return (
    <div data-testid="product-list">
      {products.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
