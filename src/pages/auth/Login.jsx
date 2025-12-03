import React from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Email requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña requerida')
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const result = await login(values);
      if (result.success) {
        navigate('/');
      } else {
        setFieldError('general', result.message);
      }
    } catch (error) {
      setFieldError('general', 'Error al iniciar sesión');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="login-page">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                {errors.general && <Alert variant="danger">{errors.general}</Alert>}
                
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

                <Button variant="success" type="submit" className="w-100" disabled={isSubmitting}>
                  {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
                </Button>

                <div className="text-center mt-3">
                  <Link to="/registro">¿No tienes cuenta? Regístrate</Link>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;