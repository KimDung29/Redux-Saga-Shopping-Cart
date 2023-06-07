import { ProductType } from "../../redux/productSlice";
import { memo } from "react";
interface ListProductType {
  products: ProductType[];
  setCurrentProduct: (product: ProductType) => void;
}

const ListProduct = memo(function ListProduct({
  products,
  setCurrentProduct,
}: ListProductType) {
  return (
    <>
      {products.map((product) => (
        <div
          onClick={() => {
            setCurrentProduct(product);
          }}
          className="container-fluid row mb-3 p-1 border rounded cursor-pointer align-items-center"
          key={product.id}
        >
          <div className=" col-4  text-center">
            <img
              className=" w-50 h-auto border-none"
              src={product.image}
              alt="Responsive image"
            />
          </div>
          <div className="col">
            <h6>{product.title.slice(0, 30)}...</h6>
            <p>{product.description.slice(0, 80)}...</p>
            <h6>${product.price}</h6>
          </div>
        </div>
      ))}
    </>
  );
});

export default ListProduct;
