import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductFetch } from "../redux/productSlice";

export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getProductFetch());
  }, []);

  return (
    <>
      <div className="navbar bg-primary text-white mb-5 position-fixed w-100 index">
        <h5 onClick={() => navigate("/")} className="cursor-pointer">
          Product
        </h5>
        <h4>STORE.</h4>
        <h5 onClick={() => navigate("/cart")} className="cursor-pointer">
          <i className="fas fa-shopping-cart">
            <sup className="text-white bg-danger p-1 rounded-circle d-inline-block number ">
              {cart.length}
            </sup>
          </i>
        </h5>
      </div>
      <ToastContainer />
    </>
  );
}
