import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AnswerMainCard from "../Components/AnswerMainCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchAnswerComments } from "../Utils";
import CommentCard from "../Components/CommentCard";
import { CommentModal } from "../Components/CommentModal";
import { useSelector } from "react-redux";


export const AnswerPage = () => {

    const user = useSelector((state) => state.user.user);

    const [aComms, setAComms] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const params = useParams();

    useEffect(() => {
        if (user) {
            fetchAnswerComments(params.answerId).then((aComms) => {
                setAComms(aComms);
            }).catch((err) => {
                console.log("There was an error while fetching the question ", err);
            })
        }
    }, [params.answerId,user]);

    let commentCards;

    if (aComms) {
        commentCards = aComms.comments.map(c => <CommentCard key={c.commentId} comment={c} />)
    }

    const toggleCommentModalOn = () => {
        setShowCommentModal(true);
    }

    const handleAddComment = (comment) => {
        setAComms(prevState => {
            return {
                answer: prevState.answer,
                comments: [...prevState.comments, comment]
            }
        })
    }

    return (
        <>
            {showCommentModal && (<CommentModal show={showCommentModal} onHide={() => setShowCommentModal(false)} user={user} answer={aComms.answer} handleAddComment={handleAddComment} />)}
            <Container>
                <Row>
                    {aComms && <AnswerMainCard answer={aComms.answer} toggleCommentModalOn={toggleCommentModalOn} />}
                </Row>
                <Row className="mb-5">
                    <div className="h3 text-center light-txt-color">Comments</div>
                </Row>
                <Row>
                    {aComms && aComms.comments.length > 0 ? commentCards : <div className="text-center light-txt-color fs-3">No one has commented on this answer.</div>}
                </Row>
            </Container>
        </>
    );
}

export default AnswerPage;