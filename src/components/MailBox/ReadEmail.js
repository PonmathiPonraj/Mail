import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ReadSentEmail(props) {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title> From:{props.emailAddress}</Modal.Title>
        </Modal.Header>
        <Modal.Header>
          <Modal.Title> Subject:{props.emailSubject}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{props.emailContent}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ReadSentEmail;