import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../css/pages/contact.css';

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
      // Aquí iría la lógica para enviar el mensaje
    },
  });

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Contáctanos
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información de contacto
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                Email: info@huertohogar.com
              </Typography>
              <Typography variant="body1">
                Teléfono: (123) 456-7890
              </Typography>
              <Typography variant="body1">
                Dirección: Calle Principal #123, Ciudad
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                name="name"
                label="Nombre"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                margin="normal"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                margin="normal"
                name="message"
                label="Mensaje"
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Enviar Mensaje
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;