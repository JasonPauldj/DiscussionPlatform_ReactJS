import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { deleteAnswer } from "../Utils";


export const DeleteAnswerModal = ({ show, onHide, answer, onSuccessfulDelete }) => {
    const [errMsg, setErrMsg] = useState(null);
    const [showErrAlert, setShowErrAlert] = useState(false);


    const handleAnswerDelete = () => {
        deleteAnswer(answer.answerId).then(() => {
            onSuccessfulDelete(answer);
            onHide()}).catch(err => {
            setShowErrAlert(true);
            setErrMsg(err.message);
        })
    }

    return (
        <Modal show={show} size="lg" centered onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Answer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete your answer ?
            </Modal.Body>
            {showErrAlert && <Alert variant="danger" onClose={()=>setShowErrAlert(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    {errMsg}
                </p>
            </Alert>}
            <Modal.Footer>
                <Button variant="success" onClick={handleAnswerDelete}>Yes</Button>
                <Button variant="danger" onClick={onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteAnswerModal;