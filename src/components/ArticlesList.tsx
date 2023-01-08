import { Link } from 'react-router-dom';

interface Articles {
    articles: Article[]
}

interface Article {
    title: string,
    name: string,
    content: string[]
}

const ArticlesList = ({articles} : Articles) => {
    const data = articles.map(m => (
        <Link to={`/articles/${m.name}`} key={m.name} className='article-list-item'>
            <h1>{m.title}</h1>
            <p>{m.content.join().substring(0, 300)}</p>
        </Link>
    ))
    return (
        <ul>
            {data}
        </ul>
    )
}

export default ArticlesList;