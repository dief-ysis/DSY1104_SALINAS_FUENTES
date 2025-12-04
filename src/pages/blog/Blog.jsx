/**
 * BLOG PAGE - PÁGINA DE BLOG
 * 
 * Muestra artículos sobre agricultura orgánica, recetas y consejos.
 */

import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Blog.css';

// Mock de artículos de blog (TODO: obtener del backend)
const BLOG_POSTS = [
  {
    id: 1,
    titulo: 'Beneficios de los Alimentos Orgánicos',
    extracto: 'Descubre por qué los alimentos orgánicos son mejores para tu salud y el medio ambiente.',
    categoria: 'Salud',
    autor: 'María González',
    fecha: '2024-11-15',
    imagen: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=60',
    lecturaMinutos: 5
  },
  {
    id: 2,
    titulo: '5 Recetas Saludables con Verduras Orgánicas',
    extracto: 'Prepara deliciosas recetas usando productos frescos de tu huerto o mercado local.',
    categoria: 'Recetas',
    autor: 'Chef Carlos',
    fecha: '2024-11-10',
    imagen: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=60',
    lecturaMinutos: 8
  },
  {
    id: 3,
    titulo: 'Cómo Cultivar tu Propio Huerto en Casa',
    extracto: 'Guía completa para principiantes que quieren empezar su huerto urbano.',
    categoria: 'Jardinería',
    autor: 'Laura Martínez',
    fecha: '2024-11-05',
    imagen: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=60',
    lecturaMinutos: 10
  },
  {
    id: 4,
    titulo: 'La Importancia del Comercio Justo',
    extracto: 'Conoce cómo el comercio justo beneficia a los agricultores locales.',
    categoria: 'Sustentabilidad',
    autor: 'Pedro Ramírez',
    fecha: '2024-10-28',
    imagen: 'https://www.esic.edu/sites/default/files/styles/full/public/2025-06/comercio%20justo.jpg?itok=0hQCpDuX', 
    lecturaMinutos: 6
  },
  {
    id: 5,
    titulo: 'Frutas de Temporada: ¿Cuáles elegir?',
    extracto: 'Aprende a identificar y aprovechar las frutas de cada estación del año.',
    categoria: 'Salud',
    autor: 'Ana Torres',
    fecha: '2024-10-20',
    imagen: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=60',
    lecturaMinutos: 7
  },
  {
    id: 6,
    titulo: 'Reducir el Desperdicio de Alimentos',
    extracto: 'Consejos prácticos para aprovechar al máximo tus compras de productos frescos.',
    categoria: 'Sustentabilidad',
    autor: 'Juan Pérez',
    fecha: '2024-10-15',
    imagen: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=800&q=60', 
    lecturaMinutos: 5
  }
];

const CATEGORIAS = ['Todas', 'Salud', 'Recetas', 'Jardinería', 'Sustentabilidad'];

const Blog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Filtrar posts
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.extracto.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || post.categoria === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Container className="blog-page">
      <div className="blog-header">
        <h1>📝 Blog HuertoHogar</h1>
        <p className="lead">
          Consejos, recetas y noticias sobre alimentación saludable y sustentable
        </p>
      </div>

      {/* FILTROS */}
      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {CATEGORIAS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* POSTS */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-5">
          <h4>No se encontraron artículos</h4>
          <p>Intenta con otros términos de búsqueda</p>
        </div>
      ) : (
        <Row className="g-4">
          {filteredPosts.map((post) => (
            <Col key={post.id} md={6} lg={4}>
              <Card className="blog-card h-100">
                <div className="blog-image-container">
                  <Card.Img
                    variant="top"
                    src={post.imagen}
                    alt={post.titulo}
                    className="blog-image"
                    onError={(e) => {
                      e.target.src = '/assets/products/manzana.jpg';
                    }}
                  />
                  <Badge bg="success" className="blog-category-badge">
                    {post.categoria}
                  </Badge>
                </div>

                <Card.Body>
                  <div className="blog-meta mb-2">
                    <small className="text-muted">
                      <i className="bi bi-calendar3 me-1"></i>
                      {formatDate(post.fecha)}
                    </small>
                    <small className="text-muted ms-3">
                      <i className="bi bi-clock me-1"></i>
                      {post.lecturaMinutos} min de lectura
                    </small>
                  </div>

                  <Card.Title className="blog-title">
                    {post.titulo}
                  </Card.Title>

                  <Card.Text className="blog-excerpt">
                    {post.extracto}
                  </Card.Text>

                  <div className="blog-footer">
                    <div className="blog-author">
                      <i className="bi bi-person-circle me-2"></i>
                      {post.autor}
                    </div>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      Leer más →
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* NEWSLETTER */}
      <div className="blog-newsletter mt-5">
        <Card className="newsletter-card">
          <Card.Body className="text-center p-5">
            <h3>📬 Suscríbete a nuestro Newsletter</h3>
            <p>Recibe los últimos artículos y ofertas directamente en tu correo</p>
            <Form className="newsletter-form">
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="tu@email.com"
                  size="lg"
                />
                <button className="btn btn-success btn-lg" type="submit">
                  Suscribirse
                </button>
              </InputGroup>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Blog;