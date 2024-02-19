import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import { UseContext } from '../../Context/users.context';
import { addCategorys } from '../../services/category.services';


function AddCategory() {
  const [category,setCategory]=useState({
    title:'',
    description:'',
    coverImage:''
  })
  // const usecontext=useContext(UseContext)

  const handelCategory=(event, property)=>{
    event.preventDefault()
    setCategory({
      ...category,
      [property]:event.target.value 
    })
  }

  const handleClickButton=(event)=>{
      event.preventDefault()
      
      addCategorys(category).then((data)=>{
        console.log(data)
        toast.success("add Category")
      }).catch((error)=>{
        console.log( error)
        toast.error("error add category data")
      })
      setCategory({ title:'',
      description:'',
      coverImage:''
    })
  }

  return (
    <div>
        <Form className='mt-2'>
        <Form.Group className="mb-3" >
        <Form.Label> Category Title</Form.Label>
        <Form.Control rows={3} placeholder="Normal text"  value={category?.title} onChange={(event)=>handelCategory(event,'title')} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Category discripton </Form.Label>
        <Form.Control placeholder="Normal text" as="textarea" rows={6}  value={category?.description} onChange={(event)=>handelCategory(event,'description')} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Category Cover image</Form.Label>
        <Form.Control   placeholder="Normal text"  value={category?.coverImage} onChange={(event)=>handelCategory(event,'coverImage')}/>
      </Form.Group>
      <Container className='text-center m-2'  >
     
      <Button variant="primary" onClick={handleClickButton}>add Category</Button>
      <Button variant="secondary" className='ms-3 '    >clear</Button> 

    </Container>


    </Form>
    </div>
  )
}

export default AddCategory