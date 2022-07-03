import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function DisplayProduct() {
    const { id } = useParams();
    const {data,loading,error}=useFetch(`http://localhost:5001/api/posts/${id}`)
    console.log(data);
    const navigate=useNavigate()
    const deletePost=(id)=>{
        try {
          console.log(id);
          console.log("entered");
          axios.delete(`http://localhost:5001/api/posts/${id}`)
          .then(res=>{
            console.log(res);
            alert("Post has been deleted successfully")
            window.location.href = '/';
          })
        } catch (error){
          console.log(error);
        }
       }
  return (
    <>
    {loading?("Loading please wait"):(<>
      <Card sx={{ maxWidth: 345,margin:'50px auto'}}>
      <CardMedia
        component="img"
        height="140"
        image={`http://localhost:5001/${data.photo}`}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography gutterBottom variant="span" component="div">
          Price : {data.price} - Including tax (10%)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={deletePost.bind(this,data._id)}>Delete</Button>
        <Button size="small" onClick={()=>navigate('/allproducts')} >View all</Button>
      </CardActions>
    </Card>
    </>)}

    </>
  )
}

export default DisplayProduct