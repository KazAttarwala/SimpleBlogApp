import articles from '../seed-article-data';
import ArticlesList from '../components/ArticlesList';

export const ArticlesListPage = () => {
    return (
        <ArticlesList articles={articles} />
    )
}