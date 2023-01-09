import {Comment} from '../interfaces';

interface CommentsListProps {
    comments: Comment[]
}

const CommentsList = ({comments}: CommentsListProps) => {
    return (
        <>
            <h3>Comments:</h3>
            {comments.map(c => (
                <div className="comment" key={`${c.text}:${c.postedBy}`}>
                    <h4>{c.postedBy}</h4>
                    <p>{c.text}</p>
                </div>
            ))}
        </>
    )
}

export default CommentsList;