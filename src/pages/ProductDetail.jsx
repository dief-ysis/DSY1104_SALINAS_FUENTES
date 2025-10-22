import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useCart } from '../context/CartContext';
import { products } from '../database/products';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <Typography>Producto no encontrado</Typography>;
  }

  return (
    <Container>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;