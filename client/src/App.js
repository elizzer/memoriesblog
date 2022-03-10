import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AdminLogin from './AdminLogin';
import Home from './Home';
import AdminAuth from './adminauth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/create' element={<AdminAuth/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
