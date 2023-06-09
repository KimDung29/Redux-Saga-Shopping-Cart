import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import {
  getProductFetch,
  onDecrement,
  onDeleteCartItem,
  onIncrement,
  setCartAfterPurchase,
} from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Nav = lazy(() => import("../Nav"));

export default function Cart() {
  const { cart, products } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductFetch());
  }, []);

  const shipping = 10;

  const subtotal = cart.reduce(
    (acc, curr) => (acc += Math.ceil(curr.product.price * curr.quantity)),
    0
  );
  const total = subtotal + shipping;

  const handleCheckout = () => {
    const confirm = window.confirm("Do you want to checkout ?");

    if (confirm) {
      toast("Thanks for your purchase");
      dispatch(setCartAfterPurchase());
    }
  };
  const handleContinueShopping = () => {
    navigate("/");
  };

  // Tính toán tại đây và chỉ gửi kết quả tới store
  const handleDecrement = (id: number) => {
    const index = cart.findIndex((p) => p.product.id === id);
    if (index !== -1) {
      const updateCart = [...cart];
      updateCart[index] = {
        ...updateCart[index],
        quantity:
          updateCart[index].quantity > 0 ? updateCart[index].quantity - 1 : 0,
      };
      dispatch(onDecrement(updateCart));
    }
  };

  const updateCart = [...cart];
  console.log(updateCart);

  const handleIncrement = (id: number) => {
    const index = cart.findIndex((p) => p.product.id === id);
    if (index !== -1) {
      const updateCart = [...cart];
      updateCart[index] = {
        ...updateCart[index],
        quantity: updateCart[index].quantity + 1,
      };
      dispatch(onIncrement(updateCart));
    }
  };

  const handleDeleteProduct = (id: number) => {
    const items = cart.filter((p) => p.product.id !== id);
    dispatch(onDeleteCartItem(items));
  };
  return (
    <>
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <Nav />
        </Suspense>
        {cart.length === 0 && (
          <h4 className="text-center pd">There is no product in your cart</h4>
        )}
        {cart.length > 0 && (
          <div className="container d-flex pd  align-items-start">
            <div className="container col-9 ">
              {cart.map((cart) => (
                <div
                  className=" d-flex p-2 py-3   mb-5 box-shadow rounded cursor-pointer align-items-center"
                  key={cart.product.id}
                >
                  <div className=" col-4 text-center ">
                    <img
                      className=" w-50 h-auto border-none"
                      src={cart?.product?.image}
                      alt="Responsive image"
                    />
                  </div>
                  <div className="col">
                    <h4>{cart?.product?.title}</h4>
                    <p>{cart?.product?.description}</p>
                    <div className="d-flex justify-content-between ">
                      <div className="d-flex ">
                        <div
                          className="py-2 px-3 border cursor-pointer"
                          onClick={() => handleDecrement(cart?.product.id)}
                        >
                          -
                        </div>
                        <div className="py-2 px-3 border ">
                          {cart?.quantity}
                        </div>
                        <div
                          className="py-2 px-3 border cursor-pointer"
                          onClick={() => {
                            handleIncrement(cart?.product.id);
                          }}
                        >
                          +
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <h6 className="mr-3">
                          ${Math.ceil(cart?.product?.price * cart.quantity)}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => handleDeleteProduct(cart.product.id)}
                    className="float-right text-danger p-2"
                  >
                    <i className="fas fa-trash"></i>
                  </div>
                </div>
              ))}
            </div>

            <div className=" align-items-start box-shadow rounded pb-3 px-4 py-2 text-center">
              <h4>Order Info</h4>
              <div className="row justify-content-between mb-2">
                <div>Subtotal:</div>
                <div>${subtotal}</div>
              </div>
              <div className="row justify-content-between mb-2">
                <div>Shipping cost:</div>
                <div>${shipping}</div>
              </div>
              <div className="row justify-content-between mb-2">
                <h6>Total:</h6>
                <h6>${total}</h6>
              </div>
              <div className="row">
                <button
                  onClick={handleCheckout}
                  className="btn btn-primary cursor-pointer"
                >
                  Checkout
                </button>
                <button
                  onClick={handleContinueShopping}
                  className="btn btn-primary ml-1 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
