import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../Store/email";
import SentItem from "./SentItem";
import SideMenu from "./sideMenu";

const SentEmail=()=>{
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email);
  let email = userEmail.replace(/[^a-zA-Z0-9 ]/g, "");
  useEffect(()=>{
    fetch(`https://client-email-61813-default-rtdb.firebaseio.com/${email}/sent.json`)
    .then((res) => {
        if (res.ok) {
          console.log(res)
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Failed to load";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        const values = Object.values(data);
        const keys=Object.keys(data)
        console.log(keys);
        values.reverse();
        dispatch(emailActions.setSentMail(values))
      }).catch((err)=>{
        console.log(err)
      });
  },[])
return(<div>
    <h3>Welcome to Sent Mail</h3>
    <div class="container">
      <div class="row">
        <div class="col-2">
          <SideMenu />
        </div>
        <div class="col">
          <SentItem />
        </div>
      </div>
    </div>
  </div>)
}

export default SentEmail;