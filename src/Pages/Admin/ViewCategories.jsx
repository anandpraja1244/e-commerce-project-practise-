import CategoryView from "../../Component/users/CategoryView";
import React, { useEffect, useState } from "react";
import {
  deleteCategories,
  getCategories,
  updateCategory,
} from "../../services/category.services";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";

import Form from "react-bootstrap/Form";
// import Spinner from 'react-bootstrap/Spinner';
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/esm/Container";
function ViewCategories() {
  const [categories, setCategries] = useState({
    content: [],
  });
  const [selectedCate, setSlectetdCate] = useState({ content: [] });
  console.log("selectedCate", selectedCate.content);
  const [loading, setLoading] = useState(false);
  //model View......
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShowModel = () => setShow(true);

  //model update......

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  //model .ViewCategories button update..
  const ViewCategoriesButton = (categorynew) => {
    setSlectetdCate(categorynew);
    setShow(true);
  };

  // const handelCategoryUpdate = (event, proprietary) => {
  //   setSlectetdCate({
  //     ...selectedCate,
  //     [proprietary]: event.target.value,
  //   });
  // };

  //model .UpdateCategories button update..
  const updateCategoriesButton = (category) => {
    handleShowUpdate()
    setSlectetdCate(category)
    
  };

  const updateNewModel=()=>{
      // event.preventDefault()
  //  if(selectedCate.title ===undefined || selectedCate.title.trim()===''){
  //   toast.error("title  is requird")
  //  }
  //  if(selectedCate.description ===undefined || selectedCate.description.trim()===''){
  //   toast.error("description  is requird")
  //  }

  updateCategory(selectedCate)
  .then(data => {
      console.log(data)
      toast.success("Category Updated")

      const newCategories = categories.content.map(cat => {
          if (cat.categoryId === selectedCate.categoryId) {
              cat.title = data.title
              cat.description = data.description
              cat.coverImage = data.coverImage
          }

          return cat;
      })

      setCategries({
          ...categories,
          content: newCategories
      })

      handleCloseUpdate()
  })
  .catch(error => {
      console.log(error)
      toast.error("Error in updating category !!")
  })


   
  }

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => {
        console.log(data);
        setCategries(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(":error data loading");
      });
  }, []);

  const deleteCategoryMain = (categoryId) => {
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
        deleteCategories(categoryId)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            const newCategory = categories.content.filter((val) => {
              return val.categoryId !== categoryId;
            });
            setCategries({
              ...categories,
              content: newCategory,
            });
          })
          .catch((error) => {
            toast.error("error delete category");
          });
      }
    });
  };

  const updatedataCategory = () => {
    return (
      <>
        <Modal show={showUpdate} onHide={handleCloseUpdate} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col>
              <div className="md-6">
                <Table responsive="sm" className=" text-center">
                  <tbody>
                    <Container className="justify-content-center m-2">
                      <div className="text-center">
                        <Image
                          src={selectedCate.coverImage}
                          width={200}
                          height={200}
                          alt="sdfs"
                        />
                         <Form.Control type="text"
                                    placeholder="Enter here"
                                    value={selectedCate?.coverImage}
                                    onChange={(event) => setSlectetdCate({
                                        ...selectedCate,
                                        coverImage: event.target.value
                                    })}  />
                      </div>
                    </Container>

                    <tr>
                      <td>
                        <Form.Control
                          type="text"
                          placeholder="enter name"
                          value={selectedCate?.title}
                          onChange={(event) =>
                            setSlectetdCate(event, "title")
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <Form.Control
                          type="text"
                          as="textarea"
                          placeholder="enter name"
                          value={selectedCate?.description}
                          onChange={(event) =>
                            setSlectetdCate(event, "description")
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>updateNewModel()} 
         
            >
           
              <span  >Save Changes </span> 
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const ViewCategoryModal = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col>
              <div className="md-6">
                <Table responsive="sm" className=" text-center">
                  <tbody>
                    <Container className="justify-content-center m-2">
                      <div className="text-center">
                        <Image
                          src={selectedCate.coverImage}
                          width={100}
                          height={100}
                          alt="sdfs"
                        />
                      </div>
                    </Container>

                    <tr>
                      <td>
                        <h2>{selectedCate?.title}</h2>
                      </td>
                    </tr>

                    <tr>
                      <td>Gender</td>
                      <td>
                        <p>{selectedCate.description} </p>{" "}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              //  onClick={handleUpdateData}
            >
              {/* <Spinner  animation="border" variant="danger"  hidden={!updateLoading}     />  */}

              {/* <span hidden={updateLoading} >Save Changes </span>  */}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    //loading
    <div>
      <Container className="text-center" hidden={loading}>
        <Spinner />
        <div>Loading....</div>
      </Container>
      {categories.content.length > 0 ? (
        <>
          {categories.content.map((cate) => {
            return (
              <CategoryView
                ViewCatButton={ViewCategoriesButton}
                updateCatButton={updateCategoriesButton}
                deleteCat={deleteCategoryMain}
                categorynew={cate}
                key={categories.categoryId}
              />
            );
          })}
        </>
      ) : (
        <h4 className="text-center"> no category database </h4>
      )}

      {selectedCate ? ViewCategoryModal() : " "}
      {selectedCate ? updatedataCategory() : ""}
    </div>
  );
}

export default ViewCategories;
