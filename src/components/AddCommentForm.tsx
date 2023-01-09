import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const AddCommentForm = (props: any) => {
    const [commentText, setCommentText] = useState("");
    const {user, isLoading} = useUser();
    const navigate = useNavigate();

    const addComment = async (e: any) => {
        e.preventDefault();
        const res = await axios.post(`/api/articles/${props.articleId}/comment`, {
            text: commentText,
            postedBy: 'Qais'
        });
        //navigate(`/articles/${props.articleId}`);
        setCommentText("");
        props.onArticleUpdated(res.data);
    }

    const handleChange = (e: any) => {
        setCommentText(e.target.value);
    }

    return (
        <div id="add-comment-form">
            <h3>What's on your mind?</h3>
            <form onSubmit={addComment}>
                <textarea value={commentText} onChange={handleChange} rows={4} cols={50} name="text"></textarea>
                {user
                    ? <button>Post</button>
                    : <button onClick={() => navigate('/login')}>Log in to post</button>
                }
            </form>
        </div>
    )
}

export default AddCommentForm;