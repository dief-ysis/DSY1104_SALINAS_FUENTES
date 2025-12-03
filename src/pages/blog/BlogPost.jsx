/**
 * BLOG POST PAGE - ARTÍCULO INDIVIDUAL
 */

import React from 'react';
import { Container, Badge, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: Obtener artículo del backend
  const post = {
    id,
    titulo: 'Beneficios de los Alimentos Orgánicos',
    categoria: 'Salud',
    autor: 'María González',
    fecha: '2024-11-15',
    lecturaMinutos: 5,
    contenido: `
      <p>Los alimentos orgánicos han ganado popularidad en los últimos años, y con razón. 
      No solo son más saludables para nuestro cuerpo, sino que también son mejores para 
      el medio ambiente.</p>

      <h3>¿Qué son los alimentos orgánicos?</h3>
      <p>Los alimentos orgánicos son aquellos que se cultivan sin el uso de pesticidas 
      sintéticos, fertilizantes químicos, organismos genéticamente modificados (OGM) o 
      radiación ionizante.</p>

      <h3>Beneficios para la salud</h3>
      <ul>
        <li>Menos residuos de pesticidas</li>
        <li>Mayor contenido de nutrientes</li>
        <li>Sin antibióticos ni hormonas</li>
        <li>Mejor sabor y frescura</li>
      </ul>

      <h3>Beneficios ambientales</h3>
      <p>La agricultura orgánica promueve la biodiversidad, mejora la salud del suelo 
      y reduce la contaminación del agua.</p>
    `
  };

  return (
    <Container className="blog-post-page">
      <Button 
        variant="outline-secondary" 
        className="mb-4"
        onClick={() => navigate('/blog')}
      >
        <i className="bi bi-arrow-left me-2"></i>
        Volver al Blog
      </Button>

      <article className="blog-post">
        <header className="blog-post-header">
          <Badge bg="success" className="mb-3">{post.categoria}</Badge>
          <h1>{post.titulo}</h1>
          
          <div className="blog-post-meta">
            <span>
              <i className="bi bi-person-circle me-1"></i>
              {post.autor}
            </span>
            <span>
              <i className="bi bi-calendar3 me-1"></i>
              {post.fecha}
            </span>
            <span>
              <i className="bi bi-clock me-1"></i>
              {post.lecturaMinutos} min de lectura
            </span>
          </div>
        </header>

        <div 
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.contenido }}
        />

        <footer className="blog-post-footer">
          <h4>¿Te gustó este artículo?</h4>
          <p>Compártelo en redes sociales</p>
          <div className="social-share">
            <button className="btn btn-outline-primary">
              <i className="bi bi-facebook"></i>
            </button>
            <button className="btn btn-outline-info">
              <i className="bi bi-twitter"></i>
            </button>
            <button className="btn btn-outline-success">
              <i className="bi bi-whatsapp"></i>
            </button>
          </div>
        </footer>
      </article>
    </Container>
  );
};

export default BlogPost;