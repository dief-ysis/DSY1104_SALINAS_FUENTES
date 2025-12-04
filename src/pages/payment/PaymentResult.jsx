import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import webpayService from '../../services/webpayService';
import { useCart } from '../../context/CartContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearItems } = useCart();
  
  // REF DE BLOQUEO: Evita el "Double Submit" en React StrictMode
  const processedRef = useRef(false);

  useEffect(() => {
    const procesarPago = async () => {
      // SI YA PROCESAMOS, DETENER INMEDIATAMENTE
      if (processedRef.current) return;
      processedRef.current = true; // MARCAR COMO PROCESADO

      try {
        const token_ws = searchParams.get('token_ws');
        const tbk_token = searchParams.get('TBK_TOKEN');

        // Caso: Anulación por el usuario
        if (tbk_token && !token_ws) {
             throw new Error("El pago fue anulado por el usuario.");
        }

        if (!token_ws) {
          throw new Error('Token de pago no válido');
        }

        // Confirmar con Backend (Una sola vez)
        const result = await webpayService.commitTransaction(token_ws);

        if (result.success && result.data.status === 'AUTORIZADA') {
          // Éxito: Limpiamos carrito visual
          await clearItems(); 
          
          navigate('/pago-exitoso', {
            state: { transaction: result.data }
          });
        } else {
          // Rechazado
          navigate('/pago-error', {
            state: { 
              error: 'El banco rechazó la transacción',
              responseCode: result.data?.responseCode 
            }
          });
        }

      } catch (error) {
        console.error("Error en pago:", error);
        navigate('/pago-error', {
          state: { error: error.message || "Error desconocido al procesar el pago" }
        });
      }
    };

    procesarPago();
  }, []); // Dependencias vacías

  return (
    <Container className="text-center" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoadingSpinner 
        size="lg"
        text="Verificando pago con el banco..." 
      />
    </Container>
  );
};

export default PaymentResult;