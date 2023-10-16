import { useState } from "react";
import InboxList from "./InboxList";

const InboxContent=()=>{
    const [isRead,setIsRead]=useState(false)
   return(<div>
    {!isRead && <InboxList />}
   </div>)
}

export default InboxContent;