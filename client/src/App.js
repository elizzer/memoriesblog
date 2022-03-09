import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AdminLogin from './AdminLogin';
import Home from './Home';
import CreatePost from './components/CreatePost';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/create' element={<CreatePost/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
