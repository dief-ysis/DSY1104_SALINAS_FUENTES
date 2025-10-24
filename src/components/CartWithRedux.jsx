import { useSelector, useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { 
  selectCartItems, 
  selectCartTotal,
  removeFromCart,
  updateQuantity
} from '../redux/slices/cartSlice';

export default function CartWithRedux() {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  return (
    <Card>
      <Card.Header>
        <h2>Carrito de Compras (Redux)</h2>
      </Card.Header>
      <Card.Body>
        {cartItems.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5>{item.name}</h5>
                  <p className="mb-0">Precio: ${item.price}</p>
                </div>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-3"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between">
              <h4>Total:</h4>
              <h4>${total}</h4>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}