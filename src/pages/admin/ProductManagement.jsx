import React, { useState } from 'react';
import { Container, Table, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { BsPencil, BsTrash, BsPlus } from 'react-icons/bs';

const ProductManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [products] = useState([
    { id: 1, name: 'Tomates Orgánicos', price: 2500, stock: 100, category: 'Verduras' },
    { id: 2, name: 'Lechugas Hidropónicas', price: 1800, stock: 75, category: 'Verduras' },
    { id: 3, name: 'Kit de Jardinería', price: 15000, stock: 25, category: 'Herramientas' }
  ]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Productos</h1>
        <Button variant="primary" onClick={handleShow}>
          <BsPlus size={20} className="me-1" /> Nuevo Producto
        </Button>
      </div>

      <Table responsive striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>#{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price.toLocaleString()}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2">
                  <BsPencil /> Editar
                </Button>
                <Button variant="outline-danger" size="sm">
                  <BsTrash /> Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar/editar producto */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Producto</Form.Label>
                  <Form.Control type="text" placeholder="Ingrese el nombre" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select>
                    <option value="">Seleccione una categoría</option>
                    <option value="verduras">Verduras</option>
                    <option value="frutas">Frutas</option>
                    <option value="herramientas">Herramientas</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control type="number" placeholder="Ingrese el precio" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="number" placeholder="Ingrese el stock" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagen del Producto</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar Producto
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductManagement;