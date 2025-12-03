import React from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import './Register.css';

const registerSchema = Yup.object().shape({
  nombre: Yup.string().min(3, 'Mínimo 3 caracteres').required('Nombre requerido'),
  email: Yup.string().email('Email inválido').required('Email requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña')
});

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const result = await register(values);
      if (result.success) {
        navigate('/login');
      } else {
        setFieldError('general', result.message);
      }
    } catch (error) {
      setFieldError('general', 'Error al registrar');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="register-page">
      <Card className="register-card">
        <Card.Body>
          <h2 className="text-center mb-4">Crear Cuenta</h2>
          <Formik
            initialValues={{ nombre: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                {errors.general && <Alert variant="danger">{errors.general}</Alert>}
                
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

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.confirmPassword && errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="success" type="submit" className="w-100" disabled={isSubmitting}>
                  {isSubmitting ? 'Registrando...' : 'Registrarse'}
                </Button>

                <div className="text-center mt-3">
                  <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;