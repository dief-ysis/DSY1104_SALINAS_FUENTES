import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/pages/about.css';

const About = () => {
  const values = [
    {
      icon: '🌱',
      title: 'Sostenibilidad',
      description: 'Nos comprometemos con prácticas agrícolas sostenibles'
    },
    {
      icon: '❤️',
      title: 'Calidad',
      description: 'Solo los mejores productos para nuestros clientes'
    },
    {
      icon: '🤝',
      title: 'Comunidad',
      description: 'Apoyo directo a agricultores locales y responsables'
    }
  ];

  return (
    <Container className="about-page">
      <Row className="about-header">
        <Col>
          <h1>Nosotros</h1>
          <p className="lead">Tu conexión directa con lo natural</p>
        </Col>
      </Row>

      <Row className="about-content">
        <Col md={6}>
          <h2>Nuestra Historia</h2>
          <p>
            Huerto Hogar nació con la idea de acercar productos frescos 
            y orgánicos directamente desde el campo a tu mesa, eliminando 
            intermediarios y garantizando la máxima calidad.
          </p>
          <p>
            Creemos en la alimentación consciente y el comercio justo 
            con nuestros productores asociados. Nuestra misión es 
            proporcionar alimentos saludables y sostenibles mientras 
            apoyamos a los agricultores locales.
          </p>
        </Col>
        <Col md={6}>
          <img 
            src="/assets/images/ProductosOrganicos.webp" 
            alt="Huerto Hogar - Productos Orgánicos" 
            className="img-fluid rounded"
          />
        </Col>
      </Row>

      <Row className="values-section">
        <Col>
          <h2 className="text-center mb-5">Nuestros Valores</h2>
        </Col>
      </Row>
      <Row>
        {values.map((value, index) => (
          <Col md={4} key={index} className="value-card">
            <div className="value-icon">{value.icon}</div>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </Col>
        ))}
      </Row>

      <Row className="stats-section">
        <Col md={4} className="stat">
          <h3>500+</h3>
          <p>Productos Disponibles</p>
        </Col>
        <Col md={4} className="stat">
          <h3>50+</h3>
          <p>Agricultores Asociados</p>
        </Col>
        <Col md={4} className="stat">
          <h3>10k+</h3>
          <p>Clientes Felices</p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;