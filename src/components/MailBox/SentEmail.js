import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../Store/email";
import SentItem from "./SentItem";
import SideMenu from "./sideMenu";

const SentEmail = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email);
  let email = userEmail.replace(/[^a-zA-Z0-9 ]/g, "");

  useEffect(() => {
    const authToken = '...'; // Replace '...' with your actual authentication token

    fetch(`https://mail-box-ca50f-default-rtdb.firebaseio.com/${email}/sent.json`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
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
        console.log(keys);
        values.reverse();
        dispatch(emailActions.setSentMail(values));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>Welcome to Sent Mail</h3>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <SideMenu />
          </div>
          <div className="col">
            <SentItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentEmail;
