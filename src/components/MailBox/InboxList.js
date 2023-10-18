import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ReadEmail from "./ReadEmail";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../Store/email";

const InboxList = (props) => {
  const [isVisited, setIsVisited] = useState(false);
  const dispatch=useDispatch();
  const showEmail = () => {
    console.log("ShowEmail");
    setIsVisited(!isVisited);
  };
  const userEmail = useSelector((state) => state.auth.email);
  let email = userEmail.replace(/[^a-zA-Z0-9 ]/g, "");

  const deleteEmail = (key) => {
    console.log(props.id)
    dispatch(emailActions.deleteInbox(props.id))
    fetch(
      `https://mail-box-ca50f-default-rtdb.firebaseio.com/${email}/received/${props.id}.json`,
      { method: "DELETE" }
    ).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data)
    });
  };
  return (
    <div>
      {!isVisited && (
        <li class="list-group-item border-0 shadow m-1">
          <div class="row">
            <div class="col-3">
              <p className="text-start" onClick={showEmail}>{props.emailAddress}</p>
            </div>
            <div class="col-3">
              <p className="text-start" onClick={showEmail}>{props.emailSubject}</p>
            </div>
            <div class="col-3" onClick={showEmail}>{props.emailContent}</div>
            <div class="col">
              <button
                type="button"
                class="btn btn-danger"
                onClick={deleteEmail}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      )}
      {isVisited && (
        <ReadEmail
          emailAddress={props.emailAddress}
          emailContent={props.emailContent}
          emailSubject={props.emailSubject}
          onClose={showEmail}
        />
      )}
    </div>
  );
};

export default InboxList;