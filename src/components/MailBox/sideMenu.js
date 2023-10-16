import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const SideMenu = () => {
  const history=useHistory()
  const redirect=()=>{
    history.replace('/Inbox')
  }
  return (
    <div>
      <ul className="list-group border-0 bg-secondary-subtle">
        <li className="list-group-item border-0 shadow m-1" ><Link to='/Inbox'>Inbox</Link></li>
        <li className="list-group-item border-0 shadow m-1"><Link to='/Sent'>Sent Mail</Link></li>
        <li className="list-group-item border-0 shadow m-1">Unread Email</li>
        <li className="list-group-item border-0 shadow m-1">Junk</li>
        <li className="list-group-item border-0 shadow m-1">Deleted</li>
      </ul>
    </div>
  );
};

export default SideMenu;