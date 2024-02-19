import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import Container from "react-bootstrap/esm/Container";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import { getAllProducts } from "../../services/addproduct.services";
import SingleProductView from "../../Component/admin/SingleProductView";
function ViewProduct() {
  const [product, setProduct] = useState(undefined);
  //model View......
  const [show, setShow] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(undefined);
  console.log("currentProduct", currentProduct);
  const handleCloseProduct = () => setShow(false);
  const handleShowProduct = () => setShow(true);
  // console.log("product", product);

  const openProductViewModal = (event, product) => {
    setCurrentProduct(product);
    setShow(true);
  };

  const getProduct = (
    pageNumber = 0,
    pageSize = 5,
    sortBy = "addedDate",
    sortDir = "asc"
  ) => {
    getAllProducts(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        setProduct({
          ...data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProduct(0, 5, "addedDate", "asc");
  }, []);

  // delete product main to send data here.....
  const updateProductMain = (productId) => {
    const newProduct = product.content.filter((val) => {
      return val.productId !== productId;
    });
    setProduct({
      ...product,
      content: newProduct,
    });
  };

  const viewModleProducts = () => {
    return (
      currentProduct && (
        <Modal show={show} onHide={handleCloseProduct} animation={false} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col>
              <div className="md-6">
                <Table responsive="sm" className=" text-center">
                  <tbody>
                    <tr>
                      <td>{1} </td>
                      <td> {currentProduct.title} </td>
                      <td>{currentProduct.quantity} </td>
                      <td>{currentProduct.price} </td>
                      <td>{currentProduct.discountedPrice} </td>
                      <td>{currentProduct.live ? "live" : "false"} </td>
                      <td>{currentProduct.stock ? "Stock" : "outStock"} </td>
                      <td>
                        {currentProduct.category
                          ? currentProduct.category.title
                          : ""}
                      </td>
                      <td>{currentProduct.addedDate} </td>

                      <td>
                      
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => handleCloseProduct()}>
              <span>Close </span>
            </Button>
          </Modal.Footer>
        </Modal>
      )
    );
  };

  //product vewe
  const productView = () => {
    return (
      <>
        <Row>
          <Col>
            <Table striped bordered hover size="lg">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Title </th>
                  <th>Quantity </th>
                  <th>Price </th>
                  <th>Quantity Price</th>
                  <th>Live</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Added Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {product.content.map((products, i) => {
                  return (
                    <SingleProductView
                      key={i}
                      index={i}
                      product={products}
                      updateProductMain={updateProductMain}
                      openProductViewModal={openProductViewModal}
                    />
                  );
                })}
              </tbody>
            </Table>
            <Container className="d-flex justify-content-end border-1">
              <Pagination>
                <Pagination.First />
                <Pagination.Prev
                  onClick={() => {
                    if (product.pageNumber - 1 < 0)
                      return getProduct(
                        product.pageNumber - 1,
                        5,
                        "addedDate",
                        "asc"
                      );
                  }}
                />
                {[...Array(product.totalPages)]
                  .map((_, i) => i)
                  .map((item) => {
                    return (
                      <>
                        {product.pageNumber === item ? (
                          <Pagination.Item
                            className="border-1"
                            active
                            key={item}
                          >
                            {item + 1}
                          </Pagination.Item>
                        ) : (
                          <Pagination.Item
                            className="border-1"
                            key={item}
                            onClick={(event) =>
                              getProduct(item, 5, "addedDate", "asc")
                            }
                          >
                            {item + 1}
                          </Pagination.Item>
                        )}
                      </>
                    );
                  })}

                <Pagination.Next
                  onClick={() => {
                    if (product.lastPage)
                      return getProduct(
                        product.pageNumber + 1,
                        5,
                        "addedDate",
                        "asc"
                      );
                  }}
                />
                <Pagination.Last />
              </Pagination>
            </Container>
          </Col>
        </Row>
      </>
    );
  };
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Search Product</Form.Label>
              <Form.Control type="text" placeholder="search Data" />
            </Form.Group>
          </Col>
        </Row>
        {product && product ? productView() : ""}
      </Container>

      {viewModleProducts()}
    </div>
  );
}

export default ViewProduct;
