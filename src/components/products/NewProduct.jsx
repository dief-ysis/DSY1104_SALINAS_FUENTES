import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    unit: 'kilo',
    description: '',
    origin: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el producto al servidor
    setShowAlert(true);
    setTimeout(() => {
      navigate('/products');
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-brown mb-4">Agregar Nuevo Producto</Card.Title>
              
              {showAlert && (
                <Alert variant="success">
                  ¡Producto agregado exitosamente!
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre del Producto</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Precio (CLP)</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Categoría</Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccionar categoría</option>
                        <option value="Frutas Frescas">Frutas Frescas</option>
                        <option value="Verduras Orgánicas">Verduras Orgánicas</option>
                        <option value="Productos Orgánicos">Productos Orgánicos</option>
                        <option value="Productos Lácteos">Productos Lácteos</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Unidad</Form.Label>
                      <Form.Select
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        required
                      >
                        <option value="kilo">Kilo</option>
                        <option value="litro">Litro</option>
                        <option value="bolsa">Bolsa</option>
                        <option value="frasco">Frasco</option>
                        <option value="unidad">Unidad</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Origen</Form.Label>
                      <Form.Control
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="emerald" type="submit">
                    Guardar Producto
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/products')}
                  >
                    Cancelar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}