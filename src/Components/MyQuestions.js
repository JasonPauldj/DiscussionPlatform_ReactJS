import { useEffect, useState } from "react";
import { fetchMyQuestions } from "../Utils";
import Card from "react-bootstrap/Card";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import EditQuestionModal from "./EditQuestionModal";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import DeleteQuestionModal from "./DeleteQuestionModal";
import { useSelector } from "react-redux";

export const MyQuestions = () => {

    const user = useSelector((state) => state.user.user);
    const categories = useSelector((state) => state.categories.categories);

    const [myQues, setMyQues] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
    const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);


    const navigate = useNavigate();
    //fetching my questions
    useEffect(() => {
        if (user) {
            fetchMyQuestions(user.userId).then(ques => {
                setMyQues(ques);
            })
        }
    }, [user]);

    const onSuccessfulEdit = (uQ) => {
        setMyQues(prevQues => prevQues.map(q => q.questionId === uQ.questionId ? uQ : q));
    }

    const onSuccessfulDelete = (dQ) => {
        setMyQues(prevQues => prevQues.filter(q =>  q.questionId !== dQ.questionId));
    }

    const MyQuestionCard = ({ question }) => {

        const handleEditIconOnClick = (event) => {
            event.stopPropagation();
            setSelectedQuestion(question);
            setShowEditQuestionModal(true);
        }

        const handleQuestionSelection = () => {
            navigate(`/question/${question.questionId}`)
        }

        const handleDeleteIconOnClick = (event) => {
            event.stopPropagation();
            setSelectedQuestion(question);
            setShowDeleteQuestionModal(true);

        }
        return (
            <Card className="my-1 shadow" onClick={handleQuestionSelection}>
                <Card.Body >
                    <div className="d-flex justify-content-between">
                        <Card.Title>
                            {question.body}
                        </Card.Title>
                        <div>
                            <IconButton onClick={handleEditIconOnClick}>
                                <EditIcon color="primary" fontSize="large" />
                            </IconButton>
                            <IconButton onClick={handleDeleteIconOnClick}>
                                <DeleteIcon className="text-danger" fontSize="large" />
                            </IconButton>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }

    const questionCards = myQues.map(q => <MyQuestionCard question={q} key={q.questionId} />)

    return (
        <>
            {showEditQuestionModal && <EditQuestionModal question={selectedQuestion} show={showEditQuestionModal} onHide={() => setShowEditQuestionModal(false)} categories={categories} onSuccessfulEdit={onSuccessfulEdit} />}
            {showDeleteQuestionModal && <DeleteQuestionModal question={selectedQuestion} show={showDeleteQuestionModal} onHide={() => setShowDeleteQuestionModal(false)} onSuccessfulDelete={onSuccessfulDelete} />}

            {myQues.length > 0 ? questionCards : <div className="text-center light-txt-color fs-3">You have 0 questions.</div>}

        </>
    )
}

export default MyQuestions;