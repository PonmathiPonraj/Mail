import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../Store/email";
import { useEffect } from "react";
import InboxItem from "./inboxItem";
import SideMenu from "./sideMenu";

const Inbox = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email);
  let email = userEmail.replace(/[^a-zA-Z0-9 ]/g, "");

  useEffect(() => {
    const authToken = '...'; // Replace '...' with your actual authentication token

    fetch(
      `https://mail-box-ca50f-default-rtdb.firebaseio.com/${email}/received.json`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Failed to load";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const values = Object.values(data);
        const keys = Object.keys(data);
        const value = Object.entries(data);
        values.reverse();
        dispatch(emailActions.setInbox(value));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>Welcome to Inbox</h3>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <SideMenu />
          </div>
          <div className="col">
            <InboxItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
