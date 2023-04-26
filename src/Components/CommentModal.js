import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { addComment } from "../Utils";

export const CommentModal = ({ show, onHide, answer, user,handleAddComment }) => {
    const [inputComment, setInputComment] = useState('');
    const [errMsg, setErrMsg] = useState(null);
    const [showErrAlert, setShowErrAlert] = useState(false);

    const handleCommentChange = (event) => {
        setInputComment(event.target.value);
    }

    const handleSuccessfulAdd = (answer) => { 
        handleAddComment(answer);
        onHide();
    }

    const handleCommentSubmit = () => {
        addComment(inputComment, user, answer.answerId).then(handleSuccessfulAdd).catch(err => {
            setShowErrAlert(true);
            setErrMsg(err);
        })
    }

    return (
        <Modal show={show} size="lg" centered onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Comment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-2 fw-semibold">
                    {answer.body}
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="answerInput">
                        <Form.Label>Enter Comment</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter your comment here" onChange={handleCommentChange} value={inputComment} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            {showErrAlert && <Alert variant="danger" onClose={()=>setShowErrAlert(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    {errMsg}
                </p>
            </Alert>}
            <Modal.Footer>
                <Button variant="success" onClick={handleCommentSubmit}>Submit</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CommentModal;