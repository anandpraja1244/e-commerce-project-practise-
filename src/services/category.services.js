import { privateAxios } from "./axios.services"

// add category
export const addCategorys=(category)=>{
    return privateAxios.post( '/categories',category).then((response)=>response.data)
}
// get All category
export const getCategories = (category)=>{
    return privateAxios.get('/categories').then((response)=>response.data);
}
export const deleteCategories = (categoryId)=>{
    return privateAxios.delete(`/categories/${categoryId}`).then((response)=>response.data);
}



export const updateCategory = (category) => {
    return privateAxios
      .put(`/categories/${category.categoryId}`, category)
      .then((response) => response.data);
  };
  