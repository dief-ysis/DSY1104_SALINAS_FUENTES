import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import LoadingSpinner from '../../components/common/LoadingSpinner';

import '../../styles/pages/info-pages.css';

const blogsData = [
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
      <p>Los huertos orgánicos ofrecen múltiples beneficios tanto para tu salud como para el ambiente. Al cultivar tus propias verduras y frutas sin el uso de pesticidas químicos, aseguras que consumas productos frescos y libres de contaminantes.</p>
      
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

const DetalleBlog = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const foundBlog = blogsData.find(b => b.id === parseInt(id));
      if (foundBlog) {
        setBlog(foundBlog);
        // Obtener posts relacionados (excluir el actual)
        setRelatedBlogs(blogsData.filter(b => b.id !== parseInt(id)).slice(0, 2));
      }
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <LoadingSpinner />
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container className="mt-5 mb-5">
        <Row>
          <Col xs={12} className="text-center">
            <h2 style={{ color: '#dc3545' }}>Post de blog no encontrado</h2>
            <Button 
              variant="success"
              onClick={() => navigate('/blog')}
              className="mt-3"
            >
              Volver al Blog
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Breadcrumb */}
      <Row className="mb-4">
        <Col xs={12}>
          <small className="text-muted">
            <span 
              style={{ cursor: 'pointer', color: '#2E8B57' }}
              onClick={() => navigate('/blog')}
            >
              Blog
            </span>
            {' / '}{blog.title}
          </small>
        </Col>
      </Row>

      {/* Encabezado del artículo */}
      <Row className="mb-4">
        <Col xs={12}>
          <h1 style={{ color: '#2E8B57', marginBottom: '20px', fontSize: '2.5rem', fontWeight: 'bold' }}>
            {blog.title}
          </h1>

          {/* Metadata */}
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            flexWrap: 'wrap',
            paddingBottom: '20px',
            borderBottom: '2px solid #e0e0e0'
          }}>
            <div>
              <small className="text-muted">
                ✍️ Por <strong>{blog.author}</strong>
              </small>
            </div>
            <div>
              <small className="text-muted">
                📅 {new Date(blog.date).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
              </small>
            </div>
            <div>
              <small className="text-muted">
                ⏱️ {blog.readTime} min de lectura
              </small>
            </div>
            <div>
              <small style={{ backgroundColor: '#e8f5e9', color: '#2E8B57', padding: '4px 8px', borderRadius: '4px' }}>
                {blog.category}
              </small>
            </div>
          </div>
        </Col>
      </Row>

      {/* Imagen destacada */}
      <Row className="mb-4">
        <Col xs={12}>
          <img 
            src={blog.image}
            alt={blog.title}
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        </Col>
      </Row>

      {/* Contenido principal */}
      <Row className="mb-5">
        <Col xs={12} md={8} className="mx-auto">
          <div 
            style={{
              fontSize: '1.05rem',
              lineHeight: '1.8',
              color: '#333'
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </Col>
      </Row>

      {/* Separador */}
      <Row className="mb-5">
        <Col xs={12}>
          <hr style={{ borderColor: '#e0e0e0', borderWidth: '2px' }} />
        </Col>
      </Row>

      {/* Información del autor */}
      <Row className="mb-5">
        <Col xs={12} md={8} className="mx-auto">
          <Card style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <h5 style={{ color: '#2E8B57', marginBottom: '8px' }}>Sobre el autor</h5>
              <p className="mb-0">
                <strong>{blog.author}</strong> es un experto en agricultura sostenible y productos orgánicos. 
                Con más de 10 años de experiencia, {blog.author} contribuye regularmente al blog de HuertoHogar 
                compartiendo conocimientos y recomendaciones para cultivar alimentos frescos y saludables.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Posts relacionados */}
      {relatedBlogs.length > 0 && (
        <Row className="mb-5">
          <Col xs={12} md={8} className="mx-auto">
            <h3 style={{ color: '#2E8B57', marginBottom: '20px' }}>📚 Posts Relacionados</h3>
            <Row className="g-3">
              {relatedBlogs.map((relatedBlog) => (
                <Col xs={12} md={6} key={relatedBlog.id}>
                  <Card 
                    style={{ 
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onClick={() => navigate(`/blog/${relatedBlog.id}`)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <Card.Img 
                      variant="top" 
                      src={relatedBlog.image}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title style={{ fontSize: '1rem', color: '#2E8B57' }}>
                        {relatedBlog.title}
                      </Card.Title>
                      <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                        {relatedBlog.excerpt}
                      </Card.Text>
                      <small className="text-muted">
                        {relatedBlog.readTime} min lectura
                      </small>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}

      {/* Botones de acción */}
      <Row>
        <Col xs={12} className="text-center">
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="success"
              onClick={() => navigate('/blog')}
              style={{ backgroundColor: '#2E8B57', borderColor: '#2E8B57' }}
            >
              ← Volver al Blog
            </Button>
            <Button 
              variant="outline-success"
              onClick={() => navigate('/productos')}
              style={{ borderColor: '#2E8B57', color: '#2E8B57' }}
            >
              Ver Nuestros Productos
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetalleBlog;
