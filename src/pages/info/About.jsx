import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './About.css';

const About = () => {
  return (
    <Container className="about-page">
      <div className="about-header">
        <h1>Sobre Nosotros</h1>
        <p className="lead">Comprometidos con la agricultura orgánica y el comercio justo</p>
      </div>

      <Row className="mb-5">
        <Col lg={6}>
          <h2>Nuestra Historia</h2>
          <p>
            HuertoHogar nació en 2020 con la visión de conectar directamente a agricultores
            locales con consumidores que valoran productos frescos y orgánicos. Comenzamos con
            5 productores en la Región Metropolitana y hoy trabajamos con más de 50 familias
            agricultoras en todo Chile.
          </p>
          <p>
            Creemos en un comercio justo donde los agricultores reciben un precio digno por
            su trabajo y los consumidores acceden a productos de la más alta calidad, cultivados
            con amor y respeto por la tierra.
          </p>
        </Col>
        <Col lg={6}>
          <div className="about-image-container">
            {/* IMAGEN AGREGADA AQUÍ */}
            <img 
              src="https://thumbs.dreamstime.com/b/feliz-agricultor-africano-trabajando-en-el-campo-sosteniendo-una-caja-de-madera-con-verduras-frescas-215052594.jpg" 
              alt="Agricultor sosteniendo vegetales"
              className="img-fluid rounded shadow-lg"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </div>
        </Col>
      </Row>

      <h2 className="text-center mb-4">Nuestros Valores</h2>
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="value-card">
            <Card.Body className="text-center">
              <div className="value-icon">🌱</div>
              <h5>100% Orgánico</h5>
              <p>Sin pesticidas ni químicos artificiales. Solo productos naturales.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="value-card">
            <Card.Body className="text-center">
              <div className="value-icon">💚</div>
              <h5>Comercio Justo</h5>
              <p>Precios justos para agricultores y consumidores.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="value-card">
            <Card.Body className="text-center">
              <div className="value-icon">🌍</div>
              <h5>Sustentable</h5>
              <p>Cuidamos el medio ambiente en cada paso del proceso.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;