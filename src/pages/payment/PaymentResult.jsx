/**
 * PAYMENT RESULT - CALLBACK DE WEBPAY
 * 
 * Página que recibe el callback de Webpay Plus después del pago.
 * Procesa el resultado y redirige a página de éxito o error.
 * 
 * RESPONDE A PREGUNTAS P102-138 sobre Webpay Plus
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import webpayService from '../../services/webpayService';
import { useCart } from '../../context/CartContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearItems } = useCart();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const procesarPago = async () => {
      try {
        // Obtener token de Webpay de los query params
        const token_ws = searchParams.get('token_ws');
        
        if (!token_ws) {
          console.error('[PAYMENT] Token no encontrado');
          navigate('/pago-error', { 
            state: { error: 'Token de pago no válido' }
          });
          return;
        }

        // Confirmar transacción con Webpay
        const result = await webpayService.commitTransaction(token_ws);

        if (result.success && result.data.status === 'AUTHORIZED') {
          // PAGO EXITOSO
          
          // Recuperar datos del pedido desde localStorage
          const pendingOrderData = localStorage.getItem('pendingOrder');
          const orderData = pendingOrderData ? JSON.parse(pendingOrderData) : null;

          // Limpiar carrito
          await clearItems();

          // Limpiar datos temporales
          localStorage.removeItem('pendingOrder');

          // Redirigir a página de éxito con datos
          navigate('/pago-exitoso', {
            state: {
              transaction: result.data,
              order: orderData
            }
          });

        } else {
          // PAGO RECHAZADO
          navigate('/pago-error', {
            state: {
              error: result.message || 'Pago rechazado',
              responseCode: result.data?.responseCode
            }
          });
        }

      } catch (error) {
        console.error('[PAYMENT] Error al procesar resultado:', error);
        navigate('/pago-error', {
          state: { error: error.message || 'Error al procesar pago' }
        });
      } finally {
        setProcessing(false);
      }
    };

    procesarPago();
  }, [searchParams, navigate, clearItems]);

  return (
    <Container className="text-center" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <LoadingSpinner 
        fullScreen 
        text="Procesando resultado del pago..." 
      />
    </Container>
  );
};

export default PaymentResult;