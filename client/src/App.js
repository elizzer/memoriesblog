import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AdminLogin from './AdminLogin';
import Home from './Home';
import AdminAuth from './adminauth';
import ReadPost from './components/ReadPost';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
            <Container>
                <h1 className="text-center mt-3">MAYYA</h1>
            </Container>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/create' element={<AdminAuth/>}/>
        <Route path='/post/:postId' element={<ReadPost/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
