import { useState } from "react";
import ReadSentEmail from "./ReadEmail";

const SentList=(props)=>{
    const [isVisited, setIsVisited] = useState(false);
  const showEmail = () => {
    console.log("ShowEmail");
    setIsVisited(!isVisited);
  };
return(
    <div>
    {!isVisited && (
      <li class="list-group-item border-0 shadow m-1">
        <div class="row" onClick={showEmail}>
          <div class="col">
            <p className="text-start">{props.emailAddress}</p>
          </div>
          <div class="col">
            <p className="text-start">{props.emailSubject}</p>
          </div>
          <div class="col">{props.emailContent}</div>
        </div>
      </li>
    )}
    {isVisited && <ReadSentEmail emailAddress={props.emailAddress} emailContent={props.emailContent} emailSubject={props.emailSubject} onClose={showEmail}/>}
  </div>
)
}
export default SentList;