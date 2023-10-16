import { useSelector } from "react-redux";
import SentList from "./SentList";

const SentItem = () => {
  const sentEmail = useSelector((state) => state.email.sentMail);
  console.log(sentEmail);

  return (
    <div>
      <ul class="list-group border-0 bg-secondary-subtle">
        {sentEmail.map((item) => (
          <SentList
            key={Math.random()}
            emailContent={item.content}
            emailSubject={item.subject}
            emailAddress={item.email}
          />
        ))}
      </ul>
    </div>
  );
};

export default SentItem;