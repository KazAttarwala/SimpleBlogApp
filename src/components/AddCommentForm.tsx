import axios from "axios"
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const AddCommentForm = (props: any) => {
    const [commentText, setCommentText] = useState("");
    const { user, isLoading }: any = useUser();
    const navigate = useNavigate();

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const res = await axios.post(`/api/articles/${props.articleId}/comment`, {
            text: commentText,
            postedBy: 'Qais'
        },
            {
                headers: { authToken: token }
            });
        setCommentText("");
        props.onArticleUpdated(res.data);
    }

    const handleChange = (e: any) => {
        setCommentText(e.target.value);
    }

    return (
        <div id="add-comment-form">
            <h3>What's on your mind?</h3>
            <textarea style={{ width: '100%' }} placeholder="Comment here" value={commentText} rows={4} onChange={handleChange} name="text"></textarea>
            {user
                ? <Button className="mt-3" variant="secondary" onClick={() => addComment()}>Post</Button>
                : <Button className="mt-3" variant="secondary" onClick={() => navigate('/login')}>Log in to post</Button>
            }
        </div>
    )
}

export default AddCommentForm;