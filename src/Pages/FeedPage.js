import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FeedCard from "../Components/FeedCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { fetchFeed } from '../Utils';
import QuestionModal from '../Components/QuestionModal';
import '../Background.scss';



export const FeedPage = ({ isUserLoggedIn, setRedirectUrl, user, categories }) => {
    const [feed, setFeed] = useState(null);
    const [showQuestionModal, setShowQuestionModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isUserLoggedIn) {
            setRedirectUrl(location.pathname);
            navigate("/login");
        }
        else {
            fetchFeed().then((feedItems) => {
                setFeed(feedItems);
            }).catch((err) => {
                console.log("There is an err in Fetching Feed " + err);
                setFeed(null)
            })
        }
    }, [isUserLoggedIn])

    let feedCards;

    if (feed) {
        feedCards = feed.map((f) => <FeedCard key={f.question.questionId} question={f.question} answers={f.answers} />)
    }

    const handleNewQuestionClick = (event) => {
        setShowQuestionModal(true);
    }

    return (
        <>
            {showQuestionModal && (<QuestionModal show={showQuestionModal} onHide={() => setShowQuestionModal(false)} categories={categories} user={user} />)}
            <Container >
                <Row>
                    <Button className="w-auto mx-auto my-2 card-bg btn-dark-text my-5 light-bg btn-hover-light"  onClick={handleNewQuestionClick}> Add a New Question</Button>
                </Row>
                <Row>
                    {(feed) ? feedCards : <></>}
                </Row>
            </Container>
        </>
    );
};

export default FeedPage;