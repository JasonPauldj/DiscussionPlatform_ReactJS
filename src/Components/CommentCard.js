import  Card  from "react-bootstrap/Card";

export const CommentCard = ({ comment }) => {
    return (
        <Card className="my-2 shadow light-bg">
            <Card.Body>
                {comment && <Card.Subtitle>{`${comment.user.firstName} ${comment.user.lastName}`}</Card.Subtitle>}
                {comment && <Card.Text>{comment.body}</Card.Text>}
            </Card.Body>
        </Card>
    )
}

export default CommentCard;