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
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://imgs.search.brave.com/1tl38HhZFq-RRFDyKB9wRVEc-Z_kteC2X01aVPdwjvk/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9zb2Np/YWxtZWRpYWV4cGxv/cmVyLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxNy8wMy9j/cmVhdGluZy1hLW1v/YmlsZS1hcHAtc3F1/YXJlLmpwZw"
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