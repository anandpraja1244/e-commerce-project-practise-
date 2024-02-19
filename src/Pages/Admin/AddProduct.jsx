import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import { toast } from "react-toastify";
import Image from "react-bootstrap/esm/Image";

import {
  AddproductWithoutCategory,
  createProductInCategory,
} from "../../services/addproduct.services";
import { getCategories } from "../../services/category.services";
function AddProduct() {
  const [categories, setCategories] = useState(undefined);
  console.log("categories====>", categories);
  const [selectedCategoryId, setSelectedCategoryId] = useState("none");
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    quantity: 1,
    live: false,
    stock: true,
    image: undefined,
    imagePreview: undefined,
  });

  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("error in loading categories");
      });
  }, []);

  const productHandelChange = (event, proparty) => {
    console.log("proparty", proparty);

    setProduct({
      ...product,
      //   live: !product.live,
      // stock: !product.stock,
      [proparty]: event.target.value,
    });
  };

  const handelProfileChange = (event) => {
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      const reader = new FileReader();
      reader.onload = (r) => {
        setProduct({
          ...product,
          imagePreview: r.target.result,
          image: event.target.files[0],
        });
        // console.log("gggggggggggggggg", event.target.files[0])
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File !!");
      setProduct({
        ...product,
        image: undefined,
        imagePreview: undefined,
      });
    }
  };

  const productHAndelSubmit = (event) => {
    event.preventDefault();
    // setProduct({
    //   title: "",
    //   description: "",
    //   price: 0,
    //   descountedPrice: 0,
    //   quantity: 1,
    //   live: false,
    //   stock: true,
    //   image: undefined,
    //   imagePreview: undefined,
    // });
    if (product.title === undefined || product.title.trim() == "") {
      toast.error("it is requird ");
    }

    if (product.description === undefined || product.description.trim() == "") {
      toast.error("it is description ");
    }

    if (product.price <= 0) {
      toast.error("Invalid Price !! ");
    }

    if (
      product.discountedPrice <= 0 ||
      product.discountedPrice >= product.price
    ) {
      toast.error("Invalid discounted priced !!");
      return;
    }

    // ValidityState
    if (selectedCategoryId === "none") {
       // create product without category 
      AddproductWithoutCategory(product)
        .then((data) => {
          console.log("data===>", data);

          toast.success("Add Product Successfully");
        })
        .catch((error) => {
          console.log("error", error);
          toast.error("product no added");
        });
    } else {
      createProductInCategory(product)
        .then((data) => {
          console.log("data", data);

          toast.success("Add Product Successfully");
        })
        .catch((error) => {
          console.log("error", error);
          toast.error("product no added");
        });
    }
  };

  return (
    <div>
      <Form onSubmit={productHAndelSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Product Title </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product"
            value={product.title}
            onChange={(event) => productHandelChange(event, "title")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Product description</Form.Label>
          <Form.Control
            type="text"
            placeholder="description"
            value={product.description}
            onChange={(event) => productHandelChange(event, "description")}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="First name"
                value={product.price}
                onChange={(event) => productHandelChange(event, "price")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Disconted Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Last name"
                value={product.discountedPrice}
                onChange={(event) => {
                  if (event.target.value > product.price) {
                    toast.error("Invalid Discount value !!");
                    return;
                  }
                  setProduct({
                    ...product,
                    discountedPrice: event.target.value,
                  });
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={product.quantity}
            onChange={(event) => productHandelChange(event, "quantity")}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Check
              type="switch"
              label="Live"
              // checked={product.live}
              checked={product.live}
              onChange={(event) => {
                setProduct({
                  ...product,
                  live: !product.live,
                });
              }}
            />
          </Col>
          <Col>
            <Form.Check
              type="switch"
              label="Stock"
              checked={product.stock}
              onChange={(event) => {
                setProduct({
                  ...product,
                  stock: !product.stock,
                });
              }}
            />
          </Col>
        </Row>
        <Container className="text-center">
          <img
            className="img-fluid"
            style={{
              maxHeight: "250px",
            }}
            src={product.imagePreview}
            alt=""
          />
        </Container>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>select Product image</Form.Label>
          <Form.Control
            type={"file"}
            placeholder="Enter email"
            onChange={(event) => handelProfileChange(event)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>select category </Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(event) => setSelectedCategoryId(event.target.value)}
           
          >
            {categories ? (
              <>
               <option> none</option>
                {categories.content.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.title}
                  </option>
                ))}
              </>
            ) : (
              ""
            )}
          </Form.Select>
        </Form.Group>
        <Container className="text-center">
          <Button variant="primary" type="submit">
            Add Product
          </Button>
          <Button variant="secondary" className="ms-2">
            Clear
          </Button>
        </Container>
      </Form>
    </div>
  );
}

export default AddProduct;
