import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';

function SidebarMenu() {
  return (
    <>
        <ListGroup className='sticky-top'>
      <ListGroup.Item  as={NavLink} to="/admin/home" action>Home</ListGroup.Item>
      <ListGroup.Item  as={NavLink} to="/admin/add-category" action>Add Categorys</ListGroup.Item >
      <ListGroup.Item  as={NavLink} to="/admin/categories" action>View Categories </ListGroup.Item >
      <ListGroup.Item  as={NavLink} to="/admin/add-product" action>Add Product</ListGroup.Item >
      <ListGroup.Item  as={NavLink} to="/admin/products" action>View Product </ListGroup.Item>
      <ListGroup.Item  as={NavLink} to="/admin/orders" action>Orders</ListGroup.Item>
      <ListGroup.Item  as={NavLink} to="/admin/users" action>Users</ListGroup.Item>
      <ListGroup.Item  as={NavLink} to="/" action>DashBoard</ListGroup.Item>
      <ListGroup.Item  as={NavLink} to="%%%%" action>LogOut </ListGroup.Item>
    </ListGroup>
    </>
  )
}

export default SidebarMenu