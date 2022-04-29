import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
const CartScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let navigate = useNavigate();

  const { id } = useParams();

  const searchParams = useLocation();

  const qty = searchParams.search
    ? Number(searchParams.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      navigate("/shipping");
    }
    // navigate("/login?redirect=shipping");
  };;
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup.Item>
            <h3>
              Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)}
              )items
            </h3>
            <Row>
              <Col md={6}>Total Price</Col>
              <Col md={6}>
                {" "}
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn btn-block"
              disabled={cartItems.length === 0}
              onClick={checkOutHandler}
            >
              Procced To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};;;;

export default CartScreen;
