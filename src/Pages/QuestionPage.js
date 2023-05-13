import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import QuestionCard from "../Components/QuestionCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchQuestionAnswers } from "../Utils";
import AnswerCard from "../Components/AnswerCard";
import { AnswerModal } from "../Components/AnswerModal";
import { useSelector } from "react-redux";


export const QuestionPage = () => {

    const user = useSelector((state) => state.user.user);

    const [qAns, setQAns] = useState(null);
    const [showAnswerModal, setShowAnswerModal] = useState(false);
    const params = useParams();


    useEffect(() => {
        if (user) {
            fetchQuestionAnswers(params.questionId).then((qAns) => {
                setQAns(qAns);
            }).catch((err) => {
                console.log("There was an error while fetching the question ", err);
            })
        }
    }, [user]);

    let answerCards;

    if (qAns) {
        answerCards = qAns.answers.map(a => <AnswerCard key={a.answerId} answer={a} />)
    }

    const toggleAnswerModalOn = () => {
        setShowAnswerModal(true);
    }

    const handleAddAnswer = (answer) => {
        setQAns(prevState => {
            return {
                question: prevState.question,
                answers: [...prevState.answers, answer]
            }
        })
    }

    return (
        <>
            {showAnswerModal && (<AnswerModal show={showAnswerModal} onHide={() => setShowAnswerModal(false)} user={user} question={qAns.question} handleAddAnswer={handleAddAnswer} />)}
            <Container>
                <Row>
                    {qAns && <QuestionCard question={qAns.question} toggleAnswerModalOn={toggleAnswerModalOn} />}
                </Row>
                <Row className="mb-5">
                    <div className="h3 text-center light-txt-color">Answers</div>
                </Row>
                <Row>
                    {qAns && qAns.answers.length > 0 ? answerCards : <div className="text-center light-txt-color fs-3">No one has answered this question.</div>}
                </Row>
            </Container>
        </>
    );
}

export default QuestionPage;