import { useEffect, useState } from "react";
import { fetchMyAnswers } from "../Utils";
import  Card  from "react-bootstrap/Card";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditAnswerModal from "./EditAnswerModal";
import DeleteAnswerModal from "./DeleteAnswerModal";




export const MyAnswers = ({ user }) => {
    const [myAns, setMyAns] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showEditAnswerModal, setShowEditAnswerModal] = useState(false);
    const [showDeleteAnswerModal, setShowDeleteAnswerModal] = useState(false);

    //fetching my answers
    useEffect(() => {
        if (user) {
            fetchMyAnswers(user.userId).then(ques => {
                setMyAns(ques);
            })
        }
    }, [user]);

    const onSuccessfulEdit = (uA) => {
        setMyAns(prevAns => prevAns.map(a => a.answerId === uA.answerId ? uA : a));
    }

    const onSuccessfulDelete = (dA) => {
        setMyAns(prevAns => prevAns.filter(q => q.answerId !== dA.answerId));
    }

    const MyAnswerCard = ({ answer }) => {

        const handleEditIconOnClick = (event) => {
            event.stopPropagation();
            setSelectedAnswer(answer);
            setShowEditAnswerModal(true);
        }

        const handleDeleteIconOnClick = (event) => {
            event.stopPropagation();
            setSelectedAnswer(answer);
            setShowDeleteAnswerModal(true);

        }
        return (
            <Card className="my-2 shadow" >
                <Card.Header >
                    {`${answer.question.user.firstName} ${answer.question.user.lastName}`}
                </Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <Card.Title>
                            {answer.question.body}
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
                    <Card.Text>
                        {answer.body}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    const answerCards = myAns.map(a => <MyAnswerCard answer={a} key={a.answerId} />)

    return (
        <>
            {showEditAnswerModal && <EditAnswerModal answer={selectedAnswer} question={selectedAnswer.question} show={showEditAnswerModal} onHide={() => setShowEditAnswerModal(false)} onSuccessfulEdit={onSuccessfulEdit} />}
            {showDeleteAnswerModal && <DeleteAnswerModal answer={selectedAnswer} show={showDeleteAnswerModal} onHide={() => setShowDeleteAnswerModal(false)} onSuccessfulDelete={onSuccessfulDelete} />}

            {myAns.length > 0 ? answerCards : <div className="text-center light-txt-color fs-3">You have 0 answers.</div>}
        </>
    )
}

export default MyAnswers;