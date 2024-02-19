import { privateAxios } from "./axios.services";

export const AddproductWithoutCategory = (product) => {
  return privateAxios
    .post(`/products`, product)
    .then((response) => response.data);
};

//create product with category
export const createProductInCategory = (product, categoryId) => {
  return privateAxios
    .post(`/categories/${categoryId}/products`, product)
    .then((response) => response.data);
};

//add product image
export const addProductImage = (file, productId) => {
  const formData = new FormData();
  formData.append("productImage", file);
  return privateAxios
    .post(`/products/image/${productId}`, formData)
    .then((response) => response.data);
};

//get products
export const getAllProducts = (
  pageNumber = 0,
  pageSize = 10,
  sortBy = "addedDate",
  sortDir = "asc"
) => {
  return privateAxios
    .get(
      `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((response) => response.data);
};

// delete product....
export const deleteProducts=(productId)=>{
  return privateAxios.delete(`/products/${productId}` )
  .then((response)=>response.data)
}