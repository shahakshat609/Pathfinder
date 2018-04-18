import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Image from './Pathfinder_logo.png';
import '../App.css'
class Navbar extends Component {

   

    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

  <a className="navbar-brand" href="http://localhost:3001"><img src={Image} height ='100' width='300'></img></a>

  
  <ul className=" nav navbar-nav navbar-right">
    <li className="nav-item ">
    <a className="nav-link " href="http://localhost:3001/login">Login</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="http://localhost:3001/signup">Signup</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="http://localhost:3001/postproject">Post Project</a>
    </li>
    

   
   
  </ul>
</nav>

  


        );
    }
}

export default Navbar;