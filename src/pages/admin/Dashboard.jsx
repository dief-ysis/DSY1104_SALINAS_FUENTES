import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { BsPeople, BsBox, BsCart3, BsCashCoin } from 'react-icons/bs';

const Dashboard = () => {
  const [stats] = useState({
    totalUsers: 150,
    totalProducts: 45,
    totalOrders: 89,
    totalRevenue: 1250000
  });

  const recentOrders = [
    { id: 1, customer: 'Juan Pérez', total: 25000, status: 'completed' },
    { id: 2, customer: 'María López', total: 35000, status: 'pending' },
    { id: 3, customer: 'Carlos Ruiz', total: 15000, status: 'processing' }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      completed: 'success',
      pending: 'warning',
      processing: 'info'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  return (
    <Container fluid className="py-4">
      <h1 className="mb-4">Panel de Administración</h1>
      
      {/* Estadísticas */}
      <Row className="g-4 mb-4">
        <Col xs={12} sm={6} xl={3}>
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle p-3 bg-primary bg-opacity-10 me-3">
                <BsPeople className="text-primary" size={24} />
              </div>
              <div>
                <h6 className="mb-0">Usuarios Totales</h6>
                <h3 className="mb-0">{stats.totalUsers}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle p-3 bg-success bg-opacity-10 me-3">
                <BsBox className="text-success" size={24} />
              </div>
              <div>
                <h6 className="mb-0">Productos</h6>
                <h3 className="mb-0">{stats.totalProducts}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle p-3 bg-warning bg-opacity-10 me-3">
                <BsCart3 className="text-warning" size={24} />
              </div>
              <div>
                <h6 className="mb-0">Pedidos</h6>
                <h3 className="mb-0">{stats.totalOrders}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle p-3 bg-info bg-opacity-10 me-3">
                <BsCashCoin className="text-info" size={24} />
              </div>
              <div>
                <h6 className="mb-0">Ingresos</h6>
                <h3 className="mb-0">${(stats.totalRevenue).toLocaleString()}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Pedidos Recientes */}
      <Card>
        <Card.Header>
          <h5 className="mb-0">Pedidos Recientes</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>${order.total.toLocaleString()}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      Ver
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;