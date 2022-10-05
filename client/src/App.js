import './App.css';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';
//In react-router-dom v6, "Switch" is replaced by routes "Routes". You need to update the import
//Link is used to go to the required path

import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost"
import Post from "./pages/Post"
import Registration from "./pages/Registration"
import Login from "./pages/Login"

function App() {

  return (
    <div className="App">
     
     <Router>

    <div className="navbar">
      
      <Link to = "/createpost">Create A Post</Link>   
      <Link to = "/">Home Page</Link>
      <Link to = "/login">Login</Link>
      <Link to = "/registration">Registration</Link>
      
    </div>
      
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/createpost" exact element={<CreatePost/>} />
        <Route path="/post/:id" exact element={<Post/>} />
        <Route path="/registration" exact element={<Registration/>} />
        <Route path="/login" exact element={<Login/>} />
      </Routes>

     </Router>

    </div>
  );
}

export default App;
