import { useNavigate, useParams } from "react-router-dom"
import articles from '../seed-article-data';
import { NotFoundPage } from "./NotFoundPage";
import axios from "axios";
import { useState, useEffect } from 'react';
import CommentsList from "../components/CommentsList";
import { ArticleInfo } from '../interfaces';
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export const ArticlePage = () => {
    const params = useParams();
    const { articleId } = params;
    const [articleInfo, setArticleInfo] = useState<ArticleInfo | null>(null);
    const canUpvote = articleInfo ? articleInfo.canUpvote : false;
    const { user, isLoading }: any = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const getInfo = async () => {
            const token = user && await user.getIdToken();
            const res = await axios.get(`/api/articles/${articleId}`, {
                headers: { authToken: token }
            });
            setArticleInfo(res.data);
        }

        if (isLoading) {
            getInfo();
        }
    }, [isLoading, user])

    const article = articles.find(i => i.name === articleId);
    if (!article) {
        return <NotFoundPage />
    }

    const upvote = async () => {
        const token = user && await user.getIdToken();
        const res = await axios.put(`/api/articles/${articleId}/upvote`, null, {
            headers: { authToken: token }
        });
        const data = res.data;
        setArticleInfo(data);
    }

    return (
        <div className="article-list-item">
            <h1>{article?.title}</h1>
            <div id="upvotes-section">
                {user
                    ? (canUpvote ? <Button variant="success" onClick={upvote}>Upvote</Button> : <DisabledButtonWithTooltip />)
                    : <Button onClick={() => navigate('/login')}>Log in to upvote</Button>
                }
                <p>{articleInfo ? articleInfo.upvotes : 0} upvote(s)</p>
            </div>
            {article.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
            ))}
            <AddCommentForm onArticleUpdated={(articleInfo: ArticleInfo) => setArticleInfo(articleInfo)} articleId={articleId} />
            {articleInfo && articleInfo.comments &&
                <CommentsList comments={articleInfo.comments} />
            }
        </div>
    )
}

const DisabledButtonWithTooltip = () => {
    return (
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Already upvoted</Tooltip>}>
            <span className="d-inline-block">
                <Button variant="success" disabled style={{ pointerEvents: 'none' }}>
                    Upvote
                </Button>
            </span>
        </OverlayTrigger>
    )
}