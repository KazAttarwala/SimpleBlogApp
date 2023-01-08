import { useParams } from "react-router-dom"
import articles from '../seed-article-data';
import { NotFoundPage } from "./NotFoundPage";

export const ArticlePage = () => {
    const params = useParams();
    const {articleId} = params;

    const article = articles.find(i => i.name === articleId);
    if (!article) {
        return <NotFoundPage />
    }

    return (
        <div className="article-list-item">
            <h1>{article?.title}</h1>
            <p>{article?.content}</p>
        </div>
    )
}