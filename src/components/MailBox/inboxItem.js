import { useSelector } from "react-redux";
import InboxContent from "./inboxContent";
import InboxList from "./InboxList";

const InboxItem = (props) => {
  const inbox = useSelector((state) => state.email.inbox)
//   const reverseInbox=inbox.reverse()
//   console.log(reverseInbox)
  console.log(inbox);

  return (
    <div>
      {inbox.length===0 ? <p>No Emails Availble</p> : 
      inbox && <ul class="list-group border-0 bg-secondary-subtle">
        {inbox.map((item) => (
          <InboxList
            key={item[0]}
            id={item[0]}
            emailContent={item[1].content}
            emailSubject={item[1].subject}
            emailAddress={item[1].email}
          />
        ))}
      </ul>}
    </div>
  );
};

export default InboxItem;