import express from 'express';
import {db, connectToDb} from './db.js';

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    //const db = await getBlogDb();
    const {name} = req.params;
    const article = await db.collection('articles').findOne({name})

    if (article) {
        res.json(article)
    }
    else {
        res.status(404).send("That article was not found :(")
    }
})

app.put('/api/articles/:name/upvote', async (req, res) => {
    const {name} = req.params;
    //const db = await getBlogDb();
    await db.collection('articles').updateOne({name}, {
        $inc: {upvotes: 1}
    });
    
    const article = await db.collection('articles').findOne({name});
    if (article) {
        res.json(article)
    }
    else {
        res.status(404).send("That article was not found :(")
    }
})

app.post('/api/articles/:name/comment', async (req, res) => {
    const {name} = req.params;
    //const db = await getBlogDb();
    const {text, postedBy} = req.body;
    await db.collection('articles').updateOne({name}, {
        $push: {comments: {text, postedBy}}
    });

    const article = await db.collection('articles').findOne({name});
    if (article) {
        res.json(article)
    }
    else {
        res.status(404).send("That article was not found :(")
    }
})

connectToDb('mongodb://127.0.0.1:27017', 'blog-db', () => {
    console.log("connected to blog-db");
    app.listen('8000', () => {
        console.log("blog-app backend running on port 8000.")
    });
})
