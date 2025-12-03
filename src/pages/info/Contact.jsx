import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import './Contact.css';

const contactSchema = Yup.object().shape({
  nombre: Yup.string().min(3, 'Mínimo 3 caracteres').required('Nombre requerido'),
  email: Yup.string().email('Email inválido').required('Email requerido'),
  asunto: Yup.string().required('Asunto requerido'),
  mensaje: Yup.string().min(10, 'Mínimo 10 caracteres').required('Mensaje requerido')
});

const Contact = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // TODO: Implementar envío real
      console.log('Formulario enviado:', values);
      
      await Swal.fire({
        icon: 'success',
        title: 'Mensaje Enviado',
        text: 'Te responderemos a la brevedad',
        confirmButtonColor: '#2d5016'
      });
      
      resetForm();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar el mensaje',
        confirmButtonColor: '#2d5016'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="contact-page">
      <div className="contact-header">
        <h1>Contáctanos</h1>
        <p className="lead">Estamos aquí para ayudarte</p>
      </div>

      <Row>
        <Col lg={4}>
          <Card className="contact-info-card mb-4">
            <Card.Body>
              <h5><i className="bi bi-geo-alt me-2"></i>Dirección</h5>
              <p>Av. Principal 123, Santiago, Chile</p>
            </Card.Body>
          </Card>
          
          <Card className="contact-info-card mb-4">
            <Card.Body>
              <h5><i className="bi bi-telephone me-2"></i>Teléfono</h5>
              <p>+56 9 1234 5678</p>
            </Card.Body>
          </Card>
          
          <Card className="contact-info-card mb-4">
            <Card.Body>
              <h5><i className="bi bi-envelope me-2"></i>Email</h5>
              <p>contacto@huertohogar.cl</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="contact-form-card">
            <Card.Body>
              <h4 className="mb-4">Envíanos un Mensaje</h4>
              <Formik
                initialValues={{ nombre: '', email: '', asunto: '', mensaje: '' }}
                validationSchema={contactSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control
                            type="text"
                            name="nombre"
                            value={values.nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.nombre && errors.nombre}
                          />
                          <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.email && errors.email}
                          />
                          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Asunto</Form.Label>
                      <Form.Control
                        type="text"
                        name="asunto"
                        value={values.asunto}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.asunto && errors.asunto}
                      />
                      <Form.Control.Feedback type="invalid">{errors.asunto}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Mensaje</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="mensaje"
                        value={values.mensaje}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.mensaje && errors.mensaje}
                      />
                      <Form.Control.Feedback type="invalid">{errors.mensaje}</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="success" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;