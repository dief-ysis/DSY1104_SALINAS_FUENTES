import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form, Row, Col, Badge } from 'react-bootstrap';
import { BsPencil, BsTrash, BsPlus } from 'react-icons/bs';

const UserManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [users] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'María López', email: 'maria@example.com', role: 'user', status: 'active' },
    { id: 3, name: 'Carlos Ruiz', email: 'carlos@example.com', role: 'user', status: 'inactive' }
  ]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const getStatusBadge = (status) => {
    const variants = {
      active: 'success',
      inactive: 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const getRoleBadge = (role) => {
    const variants = {
      admin: 'primary',
      user: 'info'
    };
    return <Badge bg={variants[role]}>{role}</Badge>;
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Usuarios</h1>
        <Button variant="primary" onClick={handleShow}>
          <BsPlus size={20} className="me-1" /> Nuevo Usuario
        </Button>
      </div>

      <Table responsive striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>#{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{getRoleBadge(user.role)}</td>
              <td>{getStatusBadge(user.status)}</td>
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

      {/* Modal para agregar/editar usuario */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Ingrese el nombre" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Ingrese el email" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Ingrese la contraseña" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rol</Form.Label>
                  <Form.Select>
                    <option value="">Seleccione un rol</option>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select>
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar Usuario
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserManagement;