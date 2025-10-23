import React, { useState, useContext } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import '../../css/pages/login.css';

export default function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { login, loading, error } = auth || {};

  const [errors, setErrors] = useState([]);

  const validate = (email, password) => {
    const errs = [];
    if (!email) errs.push('Email es requerido');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('Email inválido');
    if (!password) errs.push('Contraseña es requerida');
    else if (password.length < 6) errs.push('La contraseña debe tener al menos 6 caracteres');
    return errs;
  };

  const validateFields = (emailValue, passwordValue) => {
    const errors = [];
    if (!emailValue) {
      errors.push('Email es requerido');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      errors.push('Email inválido');
    }

    if (!passwordValue) {
      errors.push('Contraseña es requerida');
    } else if (passwordValue.length < 6) {
      errors.push('Contraseña debe tener al menos 6 caracteres');
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const emailValue = form.email?.value || '';
    const passwordValue = form.password?.value || '';

    const validationErrors = validateFields(emailValue, passwordValue);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await login(emailValue, passwordValue);
      navigate('/');
    } catch (err) {
      setErrors([err.message]);
    }
  };

  const handleBlur = (field) => (e) => {
    const value = e.target.value;
    let error = [];

    if (field === 'email') {
      if (!value) error.push('Email es requerido');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error.push('Email inválido');
    }

    if (field === 'password') {
      if (!value) error.push('Contraseña es requerida');
      else if (value.length < 6) error.push('Contraseña debe tener al menos 6 caracteres');
    }

    setErrors(error);
  };

  return (
    <Container className="p-4" style={{ maxWidth: 600 }}>
      <Card>
        <Card.Body>
          <h1>Iniciar Sesión</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {errors.map((err, i) => (
            <div key={i} style={{ color: 'red' }}>{err}</div>
          ))}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                name="email" 
                type="email" 
                aria-label="email"
                onBlur={handleBlur('email')}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                name="password" 
                type="password" 
                aria-label="contraseña"
                onBlur={handleBlur('password')}
              />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Cargando...' : 'Iniciar Sesión'}</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}