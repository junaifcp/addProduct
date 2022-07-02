import React, { useState, useEffect } from "react";
import {
  Typography,
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
 
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Box } from "@mui/system";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
function AddProduct() {
  const navigate = useNavigate();
  const [addProduct, setAddProduct] = useState({
    name: "",
    desc: "",
    price:""
  });
//   const [newRecord, setNewRecord] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  // const navigate=useNavigate()
  const paperStyle = {
    padding: "20px",
    height: "50%",
    width: 310,
    margin: "50px auto",
  };
  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };
  const buttonStyle = {
    margin: "20px 0",
  };
  const input = {
    margin: "30px 0 0 0 ",
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(addProduct));
    setIsSubmit(true);

    //  axios.get('http://localhost:5000/posts').then((res)=>{
    //   console.log(res);
    //  })
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios
        .post("http://localhost:5001/api/posts", addProduct)
        .then((res) => {
          console.log(res.data);
          // localStorage.setItem("token",JSON.stringify(res.data))
          navigate(`/displayproduct/${res.data._id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },[formErrors]);

  const validate = (values) => {
    const errors = {};
    const nameRegex = /^[a-z ,.'-]+$/i;
    const numberRegex=/^[0-9 ,.'-]+$/i;
    if (!values.name) errors.name = "Product name is required";
    else if (!nameRegex.test(values.name))
      errors.name = "Product name is not valid";
    if (!values.desc) errors.desc = "Product description is required";
    else if (values.desc.length<20)
      errors.desc = "Description can not be too short";
    if(!values.price) errors.price="Please enter the price"
    else if(!numberRegex.test(values.price)) errors.price="Price must include only numbers"
    return errors; 
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddProduct({ ...addProduct, [name]: value });
  };
  return (
    <>
      <Grid>
        <Paper elevation={3} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <ProductionQuantityLimitsIcon />
            </Avatar>
            <Typography variant="h5">Add product</Typography>
          </Grid>
          <Grid style={input}>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                value={addProduct.name}
                onChange={handleChange}
                type="text"
                fullWidth
                placeholder="Enter product name"
                id="outlined-basic"
                label="Product"
                variant="standard"
              />
              <Typography sx={{ color: "red" }}>{formErrors.name}</Typography>
              <TextField
                name="desc"
                value={addProduct.desc}
                onChange={handleChange}
                label="Description"
                fullWidth
                multiline
                rows={5}
                autocomplete="none"
                variant="standard"
              />
              {/* <TextField name='email' value={userSingup.email} onChange={handleChange} type='email'  fullWidth placeholder='Enter email' id="outlined-basic" label="Email" variant="standard" /> */}
              <Typography sx={{ color: "red" }}>{formErrors.desc}</Typography>

              <TextField
                name="price"
                value={addProduct.price}
                onChange={handleChange}
                type="text"
                fullWidth
                placeholder="Enter product price (exclude tax)"
                id="outlined-basic"
                label="Price"
                variant="standard"
              />
              <Typography sx={{ color: "red" }}>{formErrors.price}</Typography>
              
              <br/>
              <Typography>Upload images</Typography>
              <input
                accept="image/*"
                // className={classes.input}
                // style={inputStyle}
                id="raised-button-file"
                multiple
                type="file"
              />

              <Button
                style={buttonStyle}
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Add product
              </Button>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default AddProduct;
