import { Link} from "react-router-dom/cjs/react-router-dom.min";




const MailBox= (props)=>{

    return(<div>

    <div class="card">

  <div class="card-header">

  Welcome to your mailbox

  </div>

  <ul class="list-group list-group-flush">

    <li class="list-group-item"><Link to='/ComposeMail'> Compose New Email</Link></li>

    <li class="list-group-item"><Link to='/Inbox'> Inbox </Link></li>

    <li class="list-group-item"><Link to='/Sent'>Sent Email</Link></li>

  </ul>

</div>

</div>)

}




export default MailBox;