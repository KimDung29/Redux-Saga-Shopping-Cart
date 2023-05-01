import Nav from "./Nav";
import { useEffect, useState } from "react";
import { RootState } from "../redux/reducer";
import {
  CartItem,
  fetchProductsAsync,
  onIncrementQuantity,
  onSendToCart,
  onShowDetailProduct,
  onDecrementQuantity,
} from "../redux/ProductsSlice";
import { AppDispatch, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Add, Done, Remove, ShoppingCartOutlined } from "@material-ui/icons";
import { Product } from "../redux/apiCall";
import {
  borderRadiusAndCursorStyles,
  boxShadowStyles,
  colorAndCursor,
  flexBetweenStyles,
  flexCenterStyles,
  flexStartStyles,
  imgStyles,
} from "./Re-use-css";

interface Props {
  displayBtn?: string;
  quantity?: number;
}

const Container = styled.div`
  background-color: #e5e7eb;
  height: 100vh;
`;

const Wrapper = styled.div`
  margin: 20px;
  ${flexBetweenStyles}
`;

const ProductDetails = styled.div`
  flex: 1;
  margin: 0 20px 0 0;
  padding: 10px 15px;
  border-radius: 5px;
  ${boxShadowStyles}
  flex-direction: column;
  ${flexCenterStyles}
`;

const ProductImg = styled.div`
  height: 40vh;
  width: 40%;
  margin-bottom: 10px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const ProductContent = styled.div``;
const Title = styled.h5``;
const Des = styled.p``;

const Computed = styled.div`
  margin-top: 15px;
  ${flexBetweenStyles}
`;
const Quantity = styled.div`
  width: 100px;
  padding: 5px 5px;
  border: 1px solid #a8a6a6;
  border-radius: 5px;
  background-color: #e8e7e7;
  ${flexBetweenStyles}
`;

const QuantityItem = styled.div`
  ${colorAndCursor}
`;

const QuantityNumber = styled.div`
  margin: 0 10px;
  font-size: 18px;
`;

const Price = styled.div`
  ${flexBetweenStyles}
`;
const PriceDetail = styled.h4`
  font-weight: 500;
`;

const Button = styled.button`
  ${flexCenterStyles}
  ${borderRadiusAndCursorStyles}
  padding: 8px 10px;
  margin-left: 10px;
  background-color: blue;
  color: white;
  border: none;
`;

const ProductList = styled.div`
  flex: 1;
`;

const WrapperList = styled.div`
  height: 15vh;
  flex: 1;
  ${flexStartStyles}
  ${boxShadowStyles}
  ${borderRadiusAndCursorStyles}
  margin: 5px 5px 10px 0px;
  padding: 0 5px;
`;

const ImgListWrapper = styled.div`
  height: 90%;
  flex: 1;
`;

const ImgList = styled.img`
  ${imgStyles}
`;

const DescList = styled.p`
  font-size: 11px;
  margin: 0;
`;

const ListPrice = styled.div`
  flex: 5;
  padding: 0 15px;
`;

const PriceListAndDetail = styled.div`
  margin-top: 5px;
  ${flexBetweenStyles}
`;

const PriceListItemTitle = styled.h6`
  margin-bottom: 5px;
`;
const PriceListItemDetail = styled.p`
  font-size: 14px;
`;

const ButtonSuccess = styled.button<Props>`
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
  float: right;
  display: ${(props: Props) =>
    props.quantity !== 0 && props.displayBtn === "true" ? "block" : "none"};
`;

const Products = () => {
  const [displayBtn, setDisplayBtn] = useState("false");

  const { isLoading, error, products, quantity, currentProduct } = useSelector(
    (state: RootState) => state.products
  );

  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleShowDetailProduct = (product: Product) => {
    dispatch(onShowDetailProduct({ product }));
  };

  const handleDecrementQuantity = () => {
    dispatch(onDecrementQuantity({ quantity }));
  };

  const handleIncrementQuantity = () => {
    dispatch(onIncrementQuantity({ quantity }));
  };

  const handleSendToCart = (e: any) => {
    e.preventDefault();
    const newItem: CartItem = {
      product: currentProduct[0] || products[0],
      quantity: quantity,
    };
    setDisplayBtn("true");
    if (quantity === 0) {
      window.alert(" Please select product quantity");
      setDisplayBtn("false");
    }
    dispatch(onSendToCart({ newItem }));
  };

  return (
    <>
      <Container>
        <Nav />
        <Wrapper>
          {currentProduct.length === 0 ? (
            <ProductDetails>
              <ProductImg>
                <Img src={products[0]?.image} alt={products[0]?.title} />
              </ProductImg>
              <ProductContent>
                <Title>{products[0]?.title}</Title>
                <Des>{products[0]?.description} </Des>
                <Computed>
                  <Quantity>
                    <QuantityItem
                      onClick={handleDecrementQuantity}
                      style={{ color: `${quantity === 0 ? "lightgray" : ""}` }}
                    >
                      <Remove />
                    </QuantityItem>
                    <QuantityNumber>{quantity}</QuantityNumber>
                    <QuantityItem onClick={handleIncrementQuantity}>
                      <Add />
                    </QuantityItem>
                  </Quantity>
                  <Price>
                    <PriceDetail>${products[0]?.price.toFixed(2)} </PriceDetail>
                    <Button onClick={handleSendToCart}>
                      <ShoppingCartOutlined /> Add To Cart
                    </Button>
                  </Price>
                </Computed>
                <ButtonSuccess displayBtn={displayBtn} quantity={quantity}>
                  <Done style={{ color: "yellow" }} />
                  Added Successfully!!!
                </ButtonSuccess>
              </ProductContent>
            </ProductDetails>
          ) : (
            <ProductDetails>
              <ProductImg>
                <Img
                  src={currentProduct[0]?.image}
                  alt={currentProduct[0]?.title}
                />
              </ProductImg>

              <ProductContent>
                <Title>{currentProduct[0]?.title}</Title>
                <Des>{currentProduct[0]?.description} </Des>
                <Computed>
                  <Quantity>
                    <QuantityItem
                      onClick={handleDecrementQuantity}
                      style={{ color: `${quantity === 0 ? "lightgray" : ""}` }}
                    >
                      <Remove />
                    </QuantityItem>
                    <QuantityNumber>{quantity}</QuantityNumber>
                    <QuantityItem onClick={handleIncrementQuantity}>
                      <Add />
                    </QuantityItem>
                  </Quantity>
                  <Price>
                    <PriceDetail>
                      ${currentProduct[0]?.price.toFixed(2)}{" "}
                    </PriceDetail>
                    <Button onClick={handleSendToCart}>
                      <ShoppingCartOutlined /> Add To Cart
                    </Button>
                  </Price>
                </Computed>
                <ButtonSuccess displayBtn={displayBtn} quantity={quantity}>
                  <Done style={{ color: "yellow" }} />
                  Added Successfully!!!
                </ButtonSuccess>
              </ProductContent>
            </ProductDetails>
          )}

          <ProductList onClick={() => setDisplayBtn("false")}>
            {products.slice(0, 5).map((product: Product) => (
              <WrapperList
                key={product.id}
                className="productListItem"
                onClick={() => handleShowDetailProduct(product)}
              >
                <ImgListWrapper>
                  <ImgList src={product.image} alt="" />
                </ImgListWrapper>
                <ListPrice>
                  <Title>{product.title.slice(0, 50)}...</Title>
                  <DescList>{product.description.slice(0, 150)}...</DescList>
                  <PriceListAndDetail>
                    <PriceListItemTitle>$ {product.price}</PriceListItemTitle>
                    <PriceListItemDetail>Detail</PriceListItemDetail>
                  </PriceListAndDetail>
                </ListPrice>
              </WrapperList>
            ))}
          </ProductList>
        </Wrapper>
      </Container>
    </>
  );
};
export default Products;
