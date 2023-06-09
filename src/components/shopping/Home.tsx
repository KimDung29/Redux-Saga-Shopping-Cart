import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductFetch, onCart } from "../../redux/productSlice";
import { CartType, ProductType } from "./interface";

const Nav = lazy(() => import("../Nav"));
const ListProduct = lazy(() => import("./ListProduct"));

export default function Home() {
  const dispatch = useDispatch();
  const { isLoading, error, products, cart } = useSelector(
    (state: RootState) => state.products
  );
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(
    null
  );
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    dispatch(getProductFetch());
  }, []);

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLDivElement>,
    item: ProductType
  ) => {
    e.preventDefault();
    const newProduct: CartType = {
      product: item,
      quantity: quantity,
    };

    if (quantity > 0) {
      dispatch(onCart({ newProduct }));
      toast("Add to cart successfully");
      setQuantity(0);
    }
    if (quantity === 0) {
      toast("Please choose the quantity of product");
    }
  };

  return (
    <>
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <Nav />
        </Suspense>

        {!isLoading ? (
          <div className="container row mx-auto pd">
            {products.length === 0 && <div>There are no products</div>}
            {/* DETAIL */}
            <div className="col mb-2  ">
              <div className="box-shadow rounded py-3 px-2">
                <div className="col-8 text-center mx-auto mb-2 ">
                  <img
                    className=" w-50 h-auto"
                    src={currentProduct?.image || products[0]?.image}
                    alt="Product image"
                  />
                </div>
                <h4>{currentProduct?.title || products[0]?.title}</h4>
                <p>{currentProduct?.description || products[0]?.description}</p>
                <div className="d-flex justify-content-between ">
                  <div className="d-flex ">
                    <div
                      className="py-2 px-3 border cursor-pointer"
                      onClick={handleDecrement}
                    >
                      -
                    </div>
                    <div className="py-2 px-3 border ">{quantity}</div>
                    <div
                      className="py-2 px-3 border cursor-pointer"
                      onClick={handleIncrement}
                    >
                      +
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <h6 className="mr-3">
                      ${currentProduct?.price || products[0]?.price}
                    </h6>
                    <div
                      onClick={(e) =>
                        handleAddToCart(e, currentProduct || products[0])
                      }
                    >
                      <button className="btn btn-primary">
                        <i className="fas fa-shopping-cart mr-2"></i>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* LIST */}
            <div className="col ml-5 ">
              {products.length > 0 && (
                <Suspense fallback={<div>Loading...</div>}>
                  <ListProduct
                    products={products}
                    setCurrentProduct={setCurrentProduct}
                  />
                </Suspense>
              )}
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
      {!isLoading && error && <div>Something went wrong!</div>}
    </>
  );
}
