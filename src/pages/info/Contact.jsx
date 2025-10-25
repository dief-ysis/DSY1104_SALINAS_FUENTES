import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../styles/pages/info-pages.css';

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Nombre es requerido'),
      email: Yup.string()
        .email('Email inválido')
        .required('Email es requerido'),
      message: Yup.string()
        .required('Mensaje es requerido')
        .min(10, 'El mensaje debe tener al menos 10 caracteres'),
    }),
    onSubmit: (values) => {
      console.log(values);
      alert('Mensaje enviado correctamente');
      formik.resetForm();
    },
  });

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col xs={12} className="text-center">
          <h1 className="mb-3">Contáctanos</h1>
          <p className="text-muted">
            ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col xs={12} md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="p-4">
              <img 
                src="/assets/images/contact-info.svg" 
                alt="Información de contacto" 
                className="w-100 mb-3"
                style={{ maxHeight: '250px', objectFit: 'contain' }}
              />
              <h5 className="mb-3">Información de Contacto</h5>
              <div className="mb-3">
                <p className="mb-2">
                  <strong>📧 Email:</strong> contacto@huertohogar.cl
                </p>
                <p className="mb-2">
                  <strong>📞 Teléfono:</strong> +56 9 1234 5678
                </p>
                <p className="mb-0">
                  <strong>📍 Dirección:</strong> Santiago, Chile
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h5 className="mb-4">Envíanos tu Mensaje</h5>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    placeholder="Cuéntanos tu consulta..."
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.message && Boolean(formik.errors.message)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button 
                  variant="success" 
                  type="submit" 
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  Enviar Mensaje
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;