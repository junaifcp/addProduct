import React from 'react'
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function AllItems() {
    const {data,loading,error,dispaatch}=useFetch("http://localhost:5001/api/posts")
    const deleteProduct=(id)=>{
        try {
          console.log(id);
          console.log("entered");
          axios.delete(`http://localhost:5001/api/posts/${id}`)
          .then(res=>{
            console.log(res);
            alert(res.data)
            window.location.href = '/allproducts';
          })
        } catch (error){
          console.log(error);
        }
       }
     const editProduct=(id)=>{
            window.location.href=`/editProduct/${id}`
     } 
  return (
    <>
    <div className="container">
  <div className="row">
    <div className="col-12">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Product name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {loading?("loading please wait"):(<>
    {data.map((data,i)=>(
     <tr>
     <th scope="row">{i+1}</th>
     <td>{data.name}</td>
     <td>{data.desc.slice(0,100)}</td>
     <td>{data.price}</td>
     <td>  
     <button onClick={deleteProduct.bind(this,data._id)} type="button" className="btn btn-danger"><i class="far fa-trash-alt"></i></button>
     <button onClick={editProduct.bind(this,data._id)} type="button" className="btn btn-primary"><i class="far fa-edit"></i></button>
     </td>
   </tr>
        ))}
    </>
    )}
        </tbody>
      </table>
    </div>
  </div>
 </div> 
    </>
  )
}

export default AllItems