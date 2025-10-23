import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const blogs = [
  {
    id: 1,
    title: 'Cultivo Orgánico en Casa',
    description: 'Aprende los principios básicos para mantener tu propio huerto orgánico en casa.',
    image: '/assets/images/blog1.jpg',
    date: '2025-10-15'
  },
  {
    id: 2,
    title: 'Beneficios de los Productos Orgánicos',
    description: 'Descubre por qué los productos orgánicos son mejores para tu salud y el medio ambiente.',
    image: '/assets/images/blog2.jpg',
    date: '2025-10-10'
  },
  // Agrega más blogs según sea necesario
];

const Blog = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Blog Huerto Hogar
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Aprende más sobre agricultura orgánica y vida sostenible
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {blogs.map((blog) => (
          <Grid item xs={12} md={6} key={blog.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={blog.image}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {blog.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(blog.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blog;