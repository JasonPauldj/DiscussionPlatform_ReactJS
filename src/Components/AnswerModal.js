import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { addAnswer } from "../Utils";

export const AnswerModal = ({ show, onHide, question, user,handleAddAnswer }) => {
    const [inputAnswer, setInputAnswer] = useState('');
    const [errMsg, setErrMsg] = useState(null);
    const [showErrAlert, setShowErrAlert] = useState(false);

    const handleAnswerChange = (event) => {
        setInputAnswer(event.target.value);
    }

    const handleSuccessfulAdd = (answer) => { 
        handleAddAnswer(answer);
        onHide();
    }

    const handleAnswerSubmit = () => {
        addAnswer(inputAnswer, user, question.questionId).then(handleSuccessfulAdd).catch(err => {
            setShowErrAlert(true);
            setErrMsg(err);
        })
    }

    return (
        <Modal show={show} size="lg" centered onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Answer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-2 fw-semibold">
                    {question.body}
                </div>
                <Form>
                    <Form.Group className="mb-3 " controlId="answerInput">
                        <Form.Label>Enter Answer</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter your answer here" onChange={handleAnswerChange} value={inputAnswer} rows={10} />
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
                <Button variant="success" onClick={handleAnswerSubmit} disabled={inputAnswer.length === 0}>Submit</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AnswerModal;