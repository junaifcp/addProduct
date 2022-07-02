import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AllProducts from './pages/AllProducts';
import Display from './pages/Display';
import EditProduct from './pages/EditProduct';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/displayproduct/:id' element={<Display/>}/>
        <Route path='/allproducts' element={<AllProducts/>}/>
        <Route path='/editProduct/:id' element={<EditProduct/>}/>
      </Routes>
     </Router>
    </>
  );
}

export default App;
