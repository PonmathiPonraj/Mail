import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { Link,useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Store/auth";

const NavBar= (props)=>{
    const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated)
    const history=useHistory()
    const dispatch=useDispatch()
  const logoutHandler =()=>{
    dispatch(authActions.logout())
    history.replace('/Login')
  }
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link " to="/Mailbox">
                HOME
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/Mailbox">
                SHOP
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/Mailbox">
                CONTACT US
              </Link>
            </li>
            <li class="nav-item">
              {!isAuthenticated && <Link class="nav-link" to="/LOGIN">
                Login
              </Link>}
              {isAuthenticated && <Button class="nav-link" onClick={logoutHandler}>
                Logout
              </Button>}
            </li>
          </ul>
        </div>
        {/* {isAuthenticated &&
          <Link to='/MainPage'>
           Userprofile
          </Link>
        } */}
      </nav>
    )
}

export default NavBar;