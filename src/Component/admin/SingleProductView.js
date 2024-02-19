import React from "react";
import Button from "react-bootstrap/Button";
import { GrFormAdd } from "react-icons/gr";
import Container from "react-bootstrap/Container";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { deleteProducts } from "../../services/addproduct.services";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function SingleProductView({
  product,
  index,
  updateProductMain,
  openProductViewModal,
}) {
  const getBackGroundProduct = () => {
    if (product.live && product.stock) {
      return "table-success";
    } else if (!product.live) {
      return "table-danger";
    } else if (!product.stock) {
      return "table-warning";
    }
  };
// view Modle Products ...
  const viewModleProductsButton = (event, product) => {
    console.log('product=====>>>>>', product)
    openProductViewModal(event, product);
  };

  // delete subProduct from ViewProduct..

  const deleteProductHandel = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducts(productId)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            updateProductMain(productId);
          })
          .catch((error) => {
            toast.error("error delete category");
          });
      }
    });
  };

  return (
    <tr className={getBackGroundProduct()}>
      <td>{index + 1} </td>
      <td> {product.title} </td>
      <td>{product.quantity} </td>
      <td>{product.price} </td>
      <td>{product.discountedPrice} </td>
      <td>{product.live ? "live" : "false"} </td>
      <td>{product.stock ? "Stock" : "outStock"} </td>
      <td>{product.category ? product.category.title : ""} </td>
      <td>{product.addedDate} </td>

      <td>
        <Container className="d-flex ">
          <Button
            variant="primary"
            className="me-1"
            onClick={() => deleteProductHandel(product.productId)}
          >
            <MdDelete size={20} />
          </Button>
          <Button
            variant="secondary"
            onClick={(event) => {
              viewModleProductsButton(event, product);
            }}
          >
            <GrFormAdd size={20} />
          </Button>
          <Button variant="success" className="ms-1">
            <BsPencilSquare size={20} />
          </Button>
        </Container>
      </td>
    </tr>
  );
}

export default SingleProductView;
