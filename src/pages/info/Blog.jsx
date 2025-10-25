import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/pages/info-pages.css';

const blogs = [
  {
    id: 1,
    title: 'Cultivo Orgánico en Casa',
    excerpt: 'Aprende los principios básicos para mantener tu propio huerto orgánico en casa.',
    description: 'En este artículo te mostraremos cómo comenzar con tu primer huerto orgánico. Desde la selección del lugar adecuado, la preparación del suelo, hasta el riego y mantenimiento. Descubrirás que no necesitas un espacio grande, con un balcón o patio pequeño es suficiente.',
    image: '/assets/images/blog1.jpg',
    date: '2025-10-15',
    author: 'Juan Rodríguez',
    category: 'Huerto',
    readTime: 5,
    content: `
      <h3>¿Por qué crear un huerto orgánico?</h3>
      <p>Los huertos orgánicos ofrecen múltiples beneficios tanto para tu salud como para el ambiente. Al cultivar tus propias verduras y frutas sin el uso de pesticidas químicos, asegurasque consume productos frescos y libres de contaminantes.</p>
      
      <h3>Pasos para comenzar</h3>
      <ol>
        <li><strong>Elige el lugar:</strong> Busca un espacio con al menos 4-6 horas de luz solar directa</li>
        <li><strong>Prepara el suelo:</strong> Utiliza tierra de buena calidad enriquecida con compost</li>
        <li><strong>Selecciona las plantas:</strong> Comienza con vegetales fáciles como tomates, lechugas y zanahorias</li>
        <li><strong>Establece un riego regular:</strong> Riega en las mañanas temprano o al atardecer</li>
        <li><strong>Mantén el huerto:</strong> Retira malezas y plagas de forma orgánica</li>
      </ol>
      
      <h3>Productos recomendados de HuertoHogar</h3>
      <p>Para que tu huerto sea un éxito, te recomendamos nuestro "Kit Huerto Urbano" que incluye herramientas esenciales, tierra orgánica y semillas seleccionadas.</p>
    `
  },
  {
    id: 2,
    title: 'Beneficios de los Productos Orgánicos',
    excerpt: 'Descubre por qué los productos orgánicos son mejores para tu salud y el medio ambiente.',
    description: 'Los productos orgánicos certificados ofrecen ventajas comprobadas. En este artículo exploraremos los beneficios para tu salud, el impacto ambiental positivo, y cómo reconocer productos realmente orgánicos.',
    image: '/assets/images/blog2.jpg',
    date: '2025-10-10',
    author: 'María García',
    category: 'Salud',
    readTime: 7,
    content: `
      <h3>Beneficios para la salud</h3>
      <p>Los estudios demuestran que los productos orgánicos contienen más nutrientes y antioxidantes que los convencionales. Además, al no contener residuos de pesticidas sintéticos, son más seguros para tu familia.</p>
      
      <h3>Impacto ambiental</h3>
      <p>La agricultura orgánica protege los suelos, conserva el agua y promueve la biodiversidad. También reduce la contaminación del aire y el agua, contribuyendo a un planeta más saludable.</p>
      
      <h3>Cómo identificar productos orgánicos certificados</h3>
      <ul>
        <li>Busca el sello de certificación orgánica</li>
        <li>Compra en tiendas especializadas como HuertoHogar</li>
        <li>Conoce la procedencia del producto</li>
        <li>Lee las etiquetas cuidadosamente</li>
      </ul>
    `
  },
];

const Blog = () => {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col xs={12} className="text-center">
          <h1 className="blog-title">📖 Blog HuertoHogar</h1>
          <p className="blog-subtitle">
            Aprende más sobre agricultura orgánica, sostenibilidad y vida saludable
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        {blogs.map((blog) => (
          <Col xs={12} md={6} key={blog.id} className="mb-4">
            <Card className="blog-card h-100 shadow-sm">
              <Card.Img 
                variant="top" 
                src={blog.image}
                className="blog-image"
                alt={blog.title}
              />
              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <small className="text-muted me-2">
                    📅 {new Date(blog.date).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </small>
                  <small className="blog-category">
                    {blog.category}
                  </small>
                </div>
                <Card.Title className="mb-3 blog-card-title">
                  {blog.title}
                </Card.Title>
                <Card.Text className="text-muted mb-3">
                  {blog.excerpt}
                </Card.Text>
                <div className="mt-auto">
                  <div className="mb-3 d-flex justify-content-between blog-meta">
                    <span>✍️ {blog.author}</span>
                    <span>⏱️ {blog.readTime} min lectura</span>
                  </div>
                  <Button 
                    as={Link}
                    to={`/blog/${blog.id}`}
                    variant="success"
                    className="w-100 blog-button"
                  >
                    Leer más →
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blog;