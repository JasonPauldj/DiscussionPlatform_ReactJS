import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { deleteQuestion } from "../Utils";


export const DeleteQuestionModal = ({ show, onHide, question, onSuccessfulDelete }) => {
    const [errMsg, setErrMsg] = useState(null);
    const [showErrAlert, setShowErrAlert] = useState(false);


    const handleQuestionDelete = () => {
        deleteQuestion(question.questionId).then(() => {
            console.log("IN HANDLE QUESTION DELETE", question);
            onSuccessfulDelete(question);
            onHide()}).catch(err => {
            setShowErrAlert(true);
            setErrMsg(err.message);
        })
    }

    return (
        <Modal show={show} size="lg" centered onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Question
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete your question ?
            </Modal.Body>
            {showErrAlert && <Alert variant="danger" onClose={()=>setShowErrAlert(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    {errMsg}
                </p>
            </Alert>}
            <Modal.Footer>
                <Button variant="success" onClick={handleQuestionDelete}>Yes</Button>
                <Button variant="danger" onClick={onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteQuestionModal;