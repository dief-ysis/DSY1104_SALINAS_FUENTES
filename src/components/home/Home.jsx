import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Home() {
  const featuredProducts = [
    {
      id: 'FR001',
      name: 'Manzanas Fuji',
      price: 1200,
      image: '/media/image2.jpeg',
      category: 'Frutas Frescas'
    },
    {
      id: 'VR001',
      name: 'Zanahorias Orgánicas',
      price: 900,
      image: '/media/image5.jpeg',
      category: 'Verduras Orgánicas'
    },
    {
      id: 'PO001',
      name: 'Miel Orgánica',
      price: 5000,
      image: '/media/image8.png',
      category: 'Productos Orgánicos'
    },
    {
      id: 'PL001',
      name: 'Leche Entera',
      price: 1200,
      image: 'https://via.placeholder.com/300x200?text=Leche',
      category: 'Productos Lácteos'
    }
  ];

  const stats = {
    years: 6,
    locations: 9,
    products: 10
  };

  return (
    <Container>
      {/* Hero Section */}
      <Row className="hero-section mb-5">
        <Col>
          <div className="text-center py-5">
            <h1 className="display-4 fw-bold text-brown">🌿 HuertoHogar</h1>
            <p className="lead text-secondary">
              Conectamos a las familias chilenas con el campo, promoviendo un estilo de vida saludable y sostenible
            </p>
          </div>
        </Col>
      </Row>

      {/* Stats Section */}
      <Row className="stats-section mb-5">
        <Col md={4} className="text-center">
          <h3 className="text-emerald">{stats.years}+</h3>
          <p className="text-secondary">Años de experiencia</p>
        </Col>
        <Col md={4} className="text-center">
          <h3 className="text-emerald">{stats.locations}+</h3>
          <p className="text-secondary">Puntos en Chile</p>
        </Col>
        <Col md={4} className="text-center">
          <h3 className="text-emerald">{stats.products}+</h3>
          <p className="text-secondary">Productos frescos</p>
        </Col>
      </Row>

      {/* Featured Products */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-brown mb-4">Productos Destacados</h2>
          <Row>
            {featuredProducts.map(product => (
              <Col key={product.id} md={6} lg={3} className="mb-3">
                <Card className="h-100 product-card">
                  <Card.Img 
                    variant="top" 
                    src={product.image} 
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+No+Disponible';
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-emerald">{product.name}</Card.Title>
                    <Card.Text className="text-secondary">{product.category}</Card.Text>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h5 text-brown mb-0">${product.price} CLP</span>
                        <LinkContainer to={`/products/${product.id}`}>
                          <Button variant="emerald" size="sm">Ver Detalle</Button>
                        </LinkContainer>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Mission & Vision */}
      <Row className="mb-5">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="text-emerald">🥕 Nuestra Misión</Card.Title>
              <Card.Text>
                Proporcionar productos frescos y de calidad directamente desde el campo hasta la puerta de nuestros clientes,
                garantizando la frescura y el sabor en cada entrega.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="text-emerald">🫑 Nuestra Visión</Card.Title>
              <Card.Text>
                Ser la tienda online líder en la distribución de productos frescos y naturales en Chile,
                reconocida por nuestra calidad excepcional y compromiso con la sostenibilidad.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}