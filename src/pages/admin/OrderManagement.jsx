import React, { useState } from 'react';
import { Container, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { BsEye, BsCheckCircle, BsXCircle } from 'react-icons/bs';

const OrderManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [orders] = useState([
    {
      id: 1,
      customer: 'Juan Pérez',
      date: '2025-10-15',
      total: 25000,
      status: 'completed',
      items: [
        { id: 1, name: 'Tomates Orgánicos', quantity: 2, price: 2500 },
        { id: 2, name: 'Lechugas Hidropónicas', quantity: 1, price: 1800 }
      ]
    },
    {
      id: 2,
      customer: 'María López',
      date: '2025-10-16',
      total: 35000,
      status: 'pending',
      items: [
        { id: 3, name: 'Kit de Jardinería', quantity: 1, price: 15000 }
      ]
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleShow = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const variants = {
      completed: 'success',
      pending: 'warning',
      cancelled: 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  return (
    <Container fluid className="py-4">
      <h1 className="mb-4">Gestión de Pedidos</h1>

      <Table responsive striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>${order.total.toLocaleString()}</td>
              <td>{getStatusBadge(order.status)}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleShow(order)}
                >
                  <BsEye /> Ver Detalles
                </Button>
                {order.status === 'pending' && (
                  <>
                    <Button variant="outline-success" size="sm" className="me-2">
                      <BsCheckCircle /> Aprobar
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      <BsXCircle /> Rechazar
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de detalles del pedido */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Pedido #{selectedOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <div className="mb-4">
                <h5>Información del Cliente</h5>
                <p className="mb-1"><strong>Nombre:</strong> {selectedOrder.customer}</p>
                <p className="mb-1"><strong>Fecha:</strong> {selectedOrder.date}</p>
                <p className="mb-1"><strong>Estado:</strong> {getStatusBadge(selectedOrder.status)}</p>
              </div>

              <h5>Productos</h5>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toLocaleString()}</td>
                      <td>${(item.quantity * item.price).toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                    <td><strong>${selectedOrder.total.toLocaleString()}</strong></td>
                  </tr>
                </tbody>
              </Table>

              {selectedOrder.status === 'pending' && (
                <Form.Group className="mt-3">
                  <Form.Label>Actualizar Estado</Form.Label>
                  <Form.Select>
                    <option value="pending">Pendiente</option>
                    <option value="completed">Completado</option>
                    <option value="cancelled">Cancelado</option>
                  </Form.Select>
                </Form.Group>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {selectedOrder?.status === 'pending' && (
            <Button variant="primary" onClick={handleClose}>
              Guardar Cambios
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderManagement;