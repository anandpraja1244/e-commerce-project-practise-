import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import ViewEmage from '../../assests/pro.jpg'
import Image from 'react-bootstrap/Image';


function CategoryView({categorynew ,deleteCat, ViewCatButton ,updateCatButton}) {

  const deleteCategory=(categories)=>{
    deleteCat(categories)
  }

  return (
    <div> 
     <Card className='mb-1 shadow'>
     <Card.Body>
     <Row className=' text-center  text-items-center'>
        <Col md={1}>
        <Image className=' object-fit-cover '  src={categorynew.coverImage? ( categorynew.coverImage.startsWith('http')?categorynew.coverImage:ViewEmage) : ViewEmage} alt='asfafafasf' width={100} height={100} roundedCircle/>
        </Col >
        <Col md={9} className=' text-items-center'> <h4>{categorynew.title} </h4>
        <p>{categorynew.description} </p>
         </Col>
        <Col md={2}>
        <Container className='d-grid gap-1'> 
        <Button variant="danger " onClick={()=>deleteCategory(categorynew.categoryId)} >Delete</Button>
      <Button variant="secondary" onClick={()=>ViewCatButton(categorynew)} >View</Button>
      <Button variant="success"  onClick={()=>updateCatButton(categorynew)}>Update</Button>
      </Container>
        </Col>
      </Row>
     </Card.Body>
        </Card>   
        
     </div>
  )
}

export default CategoryView