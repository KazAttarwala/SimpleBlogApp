import { useNavigate, useParams } from "react-router-dom"
import articles from '../seed-article-data';
import { NotFoundPage } from "./NotFoundPage";
import axios from "axios";
import {useState, useEffect} from 'react';
import CommentsList from "../components/CommentsList";
import {ArticleInfo} from '../interfaces';
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

export const ArticlePage = () => {
    const params = useParams();
    const {articleId} = params;
    const [articleInfo, setArticleInfo] = useState<ArticleInfo | null>(null);
    const {user, isLoading} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const getInfo = async() => {
            const req = await axios.get(`/api/articles/${articleId}`);
            console.log(req.data)
            setArticleInfo(req.data);
        } 

        getInfo();
    }, [articleId])

    const article = articles.find(i => i.name === articleId);
    if (!article) {
        return <NotFoundPage />
    }

    const upvote = async () => {
        const req = await axios.put(`/api/articles/${articleId}/upvote`);
        const data = req.data;
        setArticleInfo(data);
    }

    return (
        <div className="article-list-item">
            <h1>{article?.title}</h1>
            <div id="upvotes-section">
                {user 
                    ? <button hidden={!articleInfo || (articleInfo && !articleInfo.canUpvote)} onClick={upvote}>Upvote</button>
                    : <button onClick={() => navigate('/login')}>Log in to upvote</button>
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