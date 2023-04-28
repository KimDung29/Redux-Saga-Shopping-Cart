import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../redux/reducer";

const Nav = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state: RootState) => state.products);
  return (
    <Container>
      <Navigation>
        <NavLeft onClick={() => navigate("/")}>Products</NavLeft>
        <NavCenter>
          <Logo>KIM.</Logo>
        </NavCenter>

        <NavRight>
          <MenuItem onClick={() => navigate("/checkout")}>
            <Badge color="secondary" badgeContent={cartItems.length} showZero>
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </NavRight>
      </Navigation>
    </Container>
  );
};

export default Nav;

const Container = styled.div``;
const Navigation = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 50px;
  font-size: 20px;
  font-weight: 500;
`;
const NavLeft = styled.div`
  cursor: pointer;
`;
const Logo = styled.div`
  color: #3b82f6;
`;
const NavCenter = styled.div``;
const NavRight = styled.div``;
const MenuItem = styled.div`
  cursor: pointer;
`;
