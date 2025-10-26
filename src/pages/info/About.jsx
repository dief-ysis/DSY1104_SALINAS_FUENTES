import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useScrollToTop } from '../../hooks/useScrollToTop.js';
import '../../styles/pages/info-pages.css';

const About = () => {
  useScrollToTop();

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
          <h1 className="about-title">🌱 Sobre HuertoHogar</h1>
          <p className="text-muted mb-0 about-subtitle">
            Conectando lo fresco y natural directamente del campo a tu mesa
          </p>
        </Col>
      </Row>

      {/* Historia */}
      <Row className="mb-5">
        <Col xs={12} md={6} className="mb-4 mb-md-0 history-section">
          <h2>📖 Nuestra Historia</h2>
          <p className="history-text">
            HuertoHogar nació en 2020 con la visión de transformar la manera en que los chilenos acceden a productos frescos y orgánicos. 
            Cansados de intermediarios innecesarios y productos de baja calidad, un grupo de agricultores apasionados decidió crear 
            una plataforma directa que conectara sus cosechas con familias conscientes.
          </p>
          <p className="history-text">
            Lo que comenzó como una pequeña iniciativa de 5 agricultores ha crecido a más de 50 productores asociados, 
            sirviendo a miles de familias en todo el país. Cada producto que enviamos representa nuestro compromiso con la excelencia, 
            sostenibilidad y el trato justo a nuestros agricultores.
          </p>
        </Col>
        <Col xs={12} md={6}>
          <img 
            src="/assets/images/about-history.svg" 
            alt="Huerto Hogar - Productos Orgánicos" 
            className="history-image"
          />
        </Col>
      </Row>

      {/* Misión y Visión */}
      <Row className="mb-5">
        <Col xs={12} md={6} className="mb-4 mb-md-0">
          <Card className="mission-card">
            <Card.Body>
              <h3>🎯 Nuestra Misión</h3>
              <p className="mission-text">
                Proporcionar productos agrícolas frescos, garantizando sabor auténtico, fomentando la conexión entre consumidores 
                y agricultores, y promoviendo una alimentación saludable y sostenible que beneficie a nuestras familias y al planeta.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="vision-card">
            <Card.Body>
              <h3>🚀 Nuestra Visión</h3>
              <p className="vision-text">
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
          <h2 className="values-section-title">💎 Nuestros Valores</h2>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        {values.map((value, index) => (
          <Col xs={12} sm={6} md={4} key={index}>
            <Card className="value-card">
              <Card.Body>
                <div className="value-icon">{value.icon}</div>
                <h5 className="value-title">{value.title}</h5>
                <p className="value-description">{value.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Estadísticas */}
      <Row className="mb-5">
        <Col xs={12} className="mb-4">
          <h2 className="stats-section-title">📊 Nuestros Números</h2>
        </Col>
      </Row>

      <Row className="g-3 mb-5">
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center stat-card">
            <Card.Body>
              <h3 className="stat-number green">50+</h3>
              <p className="stat-label">Agricultores Asociados</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center stat-card orange">
            <Card.Body>
              <h3 className="stat-number orange">7</h3>
              <p className="stat-label">Productos Frescos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center stat-card light">
            <Card.Body>
              <h3 className="stat-number dark-green">3</h3>
              <p className="stat-label">Categorías</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center stat-card red">
            <Card.Body>
              <h3 className="stat-number red">100%</h3>
              <p className="stat-label">Orgánico</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Equipo */}
      <Row className="mb-5">
        <Col xs={12} className="mb-4">
          <h2 className="team-section-title">👥 Nuestro Equipo</h2>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        {team.map((member, index) => (
          <Col xs={12} md={4} key={index}>
            <Card className="team-card">
              <Card.Body className="text-center">
                <div className="team-avatar">{member.name.charAt(0)}</div>
                <h5 className="team-name">{member.name}</h5>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Compromiso final */}
      <Row>
        <Col xs={12} md={10} className="mx-auto">
          <Card className="commitment-box">
            <Card.Body className="text-center p-5">
              <h3 className="commitment-title">🌍 Nuestro Compromiso</h3>
              <p className="commitment-text">
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