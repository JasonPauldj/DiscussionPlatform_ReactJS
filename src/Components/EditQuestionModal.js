import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { updateQuestion } from "../Utils";


export const EditQuestionModal = ({ show, onHide, categories, question, onSuccessfulEdit }) => {
    const [inputQuestion, setInputQuestion] = useState(question.body);
    const [selectedCategoryId, setSelectedCategoryId] = useState(question.category.categoryId);
    const [errMsg, setErrMsg] = useState(null);
    const [showErrAlert, setShowErrAlert] = useState(false);

    const handleQuestionChange = (event) => {
        setInputQuestion(event.target.value);
    }

    const handleCategorySelectionChange = (event) => {
        setSelectedCategoryId(event.target.value);
    }

    const handleQuestionSubmit = () => {
        updateQuestion(question.questionId,inputQuestion, selectedCategoryId).then((question) => {
            onSuccessfulEdit(question);
            onHide()}).catch(err => {
            setShowErrAlert(true);
            setErrMsg(err.message);
        })
    }

    const categoryOptions = categories ? categories.map((category) => <option key={category.categoryId} value={category.categoryId}>{category.category}</option>) : null;

    return (
        <Modal show={show} size="lg" centered onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Question
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="questionInput">
                        <Form.Label>Enter Question</Form.Label>
                        <Form.Control type="text" placeholder="Enter your question" onChange={handleQuestionChange} value={inputQuestion} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>What area does the question fall into?</Form.Label>
                        <Form.Select value={selectedCategoryId} onChange={handleCategorySelectionChange}>
                            <option value="-1">Please select a category</option>
                            ${categoryOptions}
                        </Form.Select>
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
                <Button variant="success" onClick={handleQuestionSubmit} disabled={inputQuestion.length === 0}>Submit</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditQuestionModal;