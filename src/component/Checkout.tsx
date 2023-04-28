import React, { lazy, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { AppDispatch, useAppDispatch } from "../redux/store";
import { RootState } from "../redux/reducer";
import {
  CartItem,
  fetchProductsAsync,
  onDecrementProductCheckout,
  onDeleteProduct,
  onIncrementProductCheckout,
  onPurchase,
} from "../redux/ProductsSlice";
import styled from "styled-components";
import { Add, Delete, Done, Remove } from "@material-ui/icons";
const Nav = lazy(() => import("./Nav"));

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);

  const dispatch: AppDispatch = useAppDispatch();
  const { cartItems, quantity } = useSelector(
    (state: RootState) => state.products
  );
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const shippingCost = 10;

  const handleDecrementQuantityCheckout = (id: number) => {
    dispatch(onDecrementProductCheckout({ id }));
  };
  const handleIncrementProductCheckout = (id: number) => {
    dispatch(onIncrementProductCheckout({ id }));
  };

  const handleDeleteProduct = (id: number) => {
    dispatch(onDeleteProduct({ id }));
  };

  const subtotal = cartItems.reduce(
    (acc, curr) => (acc += curr.product.price * curr.quantity),
    0
  );
  const handleCheckout = (e: any) => {
    e.preventDefault();
    if (cartItems.length > 0) {
      const confirm = window.confirm(`Do you want to purchase ?`);
      if (confirm) {
        setDisplay(true);
      }

      dispatch(onPurchase());
    }
  };

  return (
    <>
      <Container>
        <Nav />
        <Wrapper>
          <MainTitle>My Shopping Cart</MainTitle>

          <WrapperCart>
            <ListCart>
              {cartItems.length > 0 ? (
                cartItems.map((item: CartItem) => (
                  <ListCartDetail key={item.product.id} display={display}>
                    <ListImg>
                      <Img src={item.product.image} alt="" />
                    </ListImg>
                    <ListContent>
                      <Content>
                        <ContentItem>
                          <Title>{item.product.title}</Title>
                          <Desc>{item.product.description}</Desc>
                        </ContentItem>
                        <DeleteIcon
                          onClick={() => handleDeleteProduct(item.product.id)}
                        >
                          <Delete />
                        </DeleteIcon>
                      </Content>
                      <ListOrder>
                        <Quantity>
                          <QuantityItem
                            onClick={() =>
                              handleDecrementQuantityCheckout(item.product.id)
                            }
                            style={{
                              color: `${quantity === 0 ? "lightgray" : ""}`,
                            }}
                          >
                            <Remove />
                          </QuantityItem>

                          <QuantityNumber>{quantity}</QuantityNumber>

                          <QuantityItem
                            onClick={() =>
                              handleIncrementProductCheckout(item.product.id)
                            }
                          >
                            <Add />
                          </QuantityItem>
                        </Quantity>
                        <PriceTotal>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </PriceTotal>
                      </ListOrder>
                    </ListContent>
                  </ListCartDetail>
                ))
              ) : (
                <NoProduct display={display}>
                  You have no products in cart
                </NoProduct>
              )}
            </ListCart>
            <OrderInfo display={display}>
              <OrderDetail>
                <OrderContent fonts="bold">Order Info</OrderContent>
                <OrderContent>
                  <TitleOrder>Subtotal: </TitleOrder>
                  <DescOrder>${subtotal.toFixed(2)}</DescOrder>
                </OrderContent>
                <OrderContent>
                  <TitleOrder>Shipping Cost: </TitleOrder>
                  <DescOrder>${shippingCost}</DescOrder>
                </OrderContent>
                <OrderContent fonts="bold">
                  <TitleOrder>Total:</TitleOrder>
                  <DescOrder>
                    $ {(subtotal + shippingCost).toFixed(2)}{" "}
                  </DescOrder>
                </OrderContent>
              </OrderDetail>

              <Button
                onClick={handleCheckout}
                feature="checkout"
                cart={cartItems.length}
              >
                Checkout
              </Button>

              <Button onClick={() => navigate("/")}>Continue Shopping</Button>
            </OrderInfo>
          </WrapperCart>
        </Wrapper>
        {display ? (
          <Purchased>
            <PurchasedAnnouncement>
              <Done style={{ color: "yellow" }} />
              Thank you for purchase!!!
            </PurchasedAnnouncement>
            <PurchasedAnnouncement
              type="purchase"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </PurchasedAnnouncement>
          </Purchased>
        ) : null}
      </Container>
    </>
  );
};

export default Checkout;

interface Props {
  feature?: string;
  fonts?: string;
  display?: boolean;
  type?: string;
  cart?: number;
}
const Container = styled.div`
  background-color: #e5e7eb;
  width: 100%;
  height: 100vh;
`;
const Wrapper = styled.div`
  margin: 0 auto;
  width: 70%;
`;
const MainTitle = styled.h2`
  font-weight: 500;
  text-align: center;
  background-color: white;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px 0;
`;
const WrapperCart = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
const ListCart = styled.div`
  flex: 2;
  margin: 0 20px 0 0;
`;

const ListCartDetail = styled.div<Props>`
  padding: 5px 10px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  display: ${(props: Props) => (props.display ? "none" : "flex")};
`;
const ListImg = styled.div`
  height: 26vh;
  width: 100%;
  margin-right: 20px;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const ListContent = styled.div``;
const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
const ContentItem = styled.div``;
const Title = styled.h5``;
const Desc = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;
const DeleteIcon = styled.div`
  color: red;
  cursor: pointer;
`;
const ListOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  padding: 3px 5px;
  border: 1px solid #a8a6a6;
  border-radius: 5px;
  background-color: #e8e7e7;
`;
const QuantityItem = styled.div`
  color: red;
  cursor: pointer;
`;
const QuantityNumber = styled.div`
  margin: 0 10px;
  font-size: 18px;
`;
const PriceTotal = styled.h4``;
const NoProduct = styled.div<Props>`
  justify-content: center;
  align-items: center;
  height: 30vh;
  font-size: 22px;
  display: ${(props: Props) => (props.display ? "none" : "flex")};
`;

const OrderInfo = styled.div<Props>`
  flex: 1;
  padding: 10px 15px;
  background-color: white;
  border-radius: 5px;
  -webkit-box-shadow: 3px 2px 9px 4px rgba(0, 0, 0, 0.18);
  box-shadow: 3px 2px 9px 4px rgba(0, 0, 0, 0.18);
  display: ${(props: Props) => (props.display ? "none" : "block")};
`;

const OrderDetail = styled.div``;
const OrderContent = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
  font-weight: ${(props: Props) => (props.fonts === "bold" ? "600" : "")};
`;
const TitleOrder = styled.p``;
const DescOrder = styled.div``;

const Button = styled.button<Props>`
  display: block;
  width: 100%;
  padding: 8px;
  margin: 15px 0;
  text-align: center;
  font-size: 18px;
  cursor: ${(props: Props) => (props.cart === 0 ? "not-allowed" : "pointer")};
  border: ${(props: Props) =>
    props.feature === "checkout" ? "none" : "1px solid #ccc"};
  border-radius: 5px;
  background-color: ${(props: Props) =>
    props.feature === "checkout" ? "blue" : "white"};
  color: ${(props: Props) => (props.feature === "checkout" ? "white" : "blue")};
`;
const Purchased = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PurchasedAnnouncement = styled.div<Props>`
  color: white;
  text-align: center;
  background-color: ${(props: Props) =>
    props.type === "purchase" ? "blue" : "green"};
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  width: 300px;
  cursor: ${(props: Props) =>
    props.type === "purchase" ? "pointer" : "default"};
`;
