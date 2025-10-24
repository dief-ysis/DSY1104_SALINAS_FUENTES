import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  const values = [
    {
      icon: '🌱',
      title: 'Sostenibilidad',
      description: 'Impulsamos prácticas agrícolas regenerativas que cuidan el planeta y protegen el futuro de nuestros hijos'
    },
    {
      icon: '✨',
      title: 'Calidad Premium',
      description: 'Solo los mejores productos, frescos y sin compromisos, directamente del campo a tu mesa'
    },
    {
      icon: '🤝',
      title: 'Comercio Justo',
      description: 'Apoyo directo a agricultores locales con precios justos y relaciones transparentes'
    },
    {
      icon: '❤️',
      title: 'Salud',
      description: 'Promovemos una alimentación consciente y libre de químicos para tu bienestar'
    },
    {
      icon: '🌍',
      title: 'Responsabilidad Social',
      description: 'Comprometidos con la comunidad y el cuidado del medio ambiente'
    },
    {
      icon: '🔐',
      title: 'Transparencia',
      description: 'Conoce el origen de cada producto y cómo fue cultivado'
    }
  ];

  const team = [
    {
      name: 'Juan Rodríguez',
      role: 'Fundador y CEO',
      bio: 'Emprendedor agrícola con 15 años de experiencia en cultivos orgánicos'
    },
    {
      name: 'María García',
      role: 'Directora de Operaciones',
      bio: 'Especialista en logística y distribución de productos frescos'
    },
    {
      name: 'Carlos López',
      role: 'Director de Relaciones con Agricultores',
      bio: 'Promotor de prácticas sostenibles y apoyo a pequeños productores'
    }
  ];

  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="mb-5">
        <Col xs={12} className="text-center">
          <h1 style={{ color: '#2E8B57', marginBottom: '20px', fontSize: '2.5rem', fontWeight: 'bold' }}>
            🌱 Sobre HuertoHogar
          </h1>
          <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
            Conectando lo fresco y natural directamente del campo a tu mesa
          </p>
        </Col>
      </Row>

      {/* Historia */}
      <Row className="mb-5">
        <Col xs={12} md={6} className="mb-4 mb-md-0">
          <h2 style={{ color: '#2E8B57', marginBottom: '20px', fontSize: '2rem', fontWeight: 'bold' }}>
            📖 Nuestra Historia
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333' }}>
            HuertoHogar nació en 2020 con la visión de transformar la manera en que los chilenos acceden a productos frescos y orgánicos. 
            Cansados de intermediarios innecesarios y productos de baja calidad, un grupo de agricultores apasionados decidió crear 
            una plataforma directa que conectara sus cosechas con familias conscientes.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333' }}>
            Lo que comenzó como una pequeña iniciativa de 5 agricultores ha crecido a más de 50 productores asociados, 
            sirviendo a miles de familias en todo el país. Cada producto que enviamos representa nuestro compromiso con la excelencia, 
            sostenibilidad y el trato justo a nuestros agricultores.
          </p>
        </Col>
        <Col xs={12} md={6}>
          <img 
            src="/assets/images/about-history.svg" 
            alt="Huerto Hogar - Productos Orgánicos" 
            style={{
              width: '100%',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              objectFit: 'cover',
              height: '350px'
            }}
          />
        </Col>
      </Row>

      {/* Misión y Visión */}
      <Row className="mb-5">
        <Col xs={12} md={6} className="mb-4 mb-md-0">
          <Card style={{ backgroundColor: '#e8f5e9', borderLeft: '4px solid #2E8B57', height: '100%' }}>
            <Card.Body>
              <h3 style={{ color: '#2E8B57', marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                🎯 Nuestra Misión
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: 0 }}>
                Proporcionar productos agrícolas frescos, garantizando sabor auténtico, fomentando la conexión entre consumidores 
                y agricultores, y promoviendo una alimentación saludable y sostenible que beneficie a nuestras familias y al planeta.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card style={{ backgroundColor: '#f0f8f0', borderLeft: '4px solid #FFD700', height: '100%' }}>
            <Card.Body>
              <h3 style={{ color: '#2E8B57', marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                🚀 Nuestra Visión
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: 0 }}>
                Ser la plataforma líder en distribución de productos frescos y naturales en Chile, revolucionando el concepto de compra 
                consciente, estableciendo un nuevo estándar de calidad, y siendo referente en sostenibilidad y responsabilidad social.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Valores */}
      <Row className="mb-5">
        <Col xs={12} className="mb-4">
          <h2 style={{ color: '#2E8B57', marginBottom: '30px', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', borderBottom: '2px solid #FFD700', paddingBottom: '15px' }}>
            💎 Nuestros Valores
          </h2>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        {values.map((value, index) => (
          <Col xs={12} sm={6} md={4} key={index}>
            <Card 
              style={{
                backgroundColor: '#f8f9fa',
                border: 'none',
                borderTop: '3px solid #2E8B57',
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Body>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
                  {value.icon}
                </div>
                <h5 style={{ color: '#2E8B57', marginBottom: '10px', fontWeight: 'bold' }}>
                  {value.title}
                </h5>
                <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: 0 }}>
                  {value.description}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Estadísticas */}
      <Row className="mb-5">
        <Col xs={12} className="mb-4">
          <h2 style={{ color: '#2E8B57', marginBottom: '30px', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', borderBottom: '2px solid #FFD700', paddingBottom: '15px' }}>
            📊 Nuestros Números
          </h2>
        </Col>
      </Row>

      <Row className="g-3 mb-5">
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center" style={{ backgroundColor: '#e8f5e9', border: 'none' }}>
            <Card.Body>
              <h3 style={{ color: '#28a745', fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>
                50+
              </h3>
              <p style={{ color: '#2E8B57', marginBottom: 0, fontWeight: 'bold' }}>
                Agricultores Asociados
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center" style={{ backgroundColor: '#fff3e0', border: 'none' }}>
            <Card.Body>
              <h3 style={{ color: '#ff9800', fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>
                7
              </h3>
              <p style={{ color: '#2E8B57', marginBottom: 0, fontWeight: 'bold' }}>
                Productos Frescos
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center" style={{ backgroundColor: '#f0f8f0', border: 'none' }}>
            <Card.Body>
              <h3 style={{ color: '#2E8B57', fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>
                3
              </h3>
              <p style={{ color: '#2E8B57', marginBottom: 0, fontWeight: 'bold' }}>
                Categorías
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center" style={{ backgroundColor: '#ffe8e8', border: 'none' }}>
            <Card.Body>
              <h3 style={{ color: '#dc3545', fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>
                100%
              </h3>
              <p style={{ color: '#2E8B57', marginBottom: 0, fontWeight: 'bold' }}>
                Orgánico
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Equipo */}
      <Row className="mb-5">
        <Col xs={12} className="mb-4">
          <h2 style={{ color: '#2E8B57', marginBottom: '30px', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', borderBottom: '2px solid #FFD700', paddingBottom: '15px' }}>
            👥 Nuestro Equipo
          </h2>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        {team.map((member, index) => (
          <Col xs={12} md={4} key={index}>
            <Card style={{ backgroundColor: '#f8f9fa', border: 'none', height: '100%' }}>
              <Card.Body className="text-center">
                <div 
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: '#2E8B57',
                    margin: '0 auto 15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    color: 'white'
                  }}
                >
                  {member.name.charAt(0)}
                </div>
                <h5 style={{ color: '#2E8B57', marginBottom: '5px', fontWeight: 'bold' }}>
                  {member.name}
                </h5>
                <p style={{ color: '#FFD700', marginBottom: '10px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {member.role}
                </p>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: 0 }}>
                  {member.bio}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Compromiso final */}
      <Row>
        <Col xs={12} md={10} className="mx-auto">
          <Card style={{ backgroundColor: '#e8f5e9', borderLeft: '6px solid #28a745' }}>
            <Card.Body className="text-center p-5">
              <h3 style={{ color: '#2E8B57', marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                🌍 Nuestro Compromiso
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: 0 }}>
                Cada día trabajamos para garantizar que en tu mesa lleguen productos frescos, saludables y sostenibles. 
                Nos comprometeemos a apoyar a agricultores locales, proteger el medio ambiente y ofrecer la mejor experiencia de compra. 
                Eres parte de una comunidad que cree en la diferencia.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;