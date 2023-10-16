
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../Store/email";
import { useEffect } from "react";
import InboxItem from "./inboxItem";
import SideMenu from "./sideMenu";
import { useState } from "react";

const Inbox = () => {

  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email);
  let email = userEmail.replace(/[^a-zA-Z0-9 ]/g, "");
  useEffect(() => {
    fetch(
      `https://client-email-61813-default-rtdb.firebaseio.com/${email}/received.json`
    )
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
        const keys=Object.keys(data);
        const value=Object.entries(data)
        console.log(value);
        values.reverse();
        dispatch(emailActions.setInbox(value));
      }).catch((err)=>{
        console.log(err)
      });
  }, []);
  return (
    <div>
      <h3>Welcome to Inbox</h3>
      <div class="container">
        <div class="row">
          <div class="col-2">
            <SideMenu />
          </div>
          <div class="col">
            <InboxItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;