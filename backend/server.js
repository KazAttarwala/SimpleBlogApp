import express from 'express';
import { db, connectToDb } from './db.js';
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import url from 'url';
import 'dotenv/config'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
    fs.readFileSync(`${__dirname}/credentials.json`)
)
admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, './build')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
})

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    if (!!authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        }
        catch (ex) {
            return res.sendStatus(400);
        }
    }
    req.user = req.user || {}
    next();
})

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ name })
    const { uid } = req.user

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.some(i => i.uid === uid);
        console.log(article)
        res.json(article)
    }
    else {
        res.status(404).send("That article was not found :(")
    }
})

app.use((req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
})

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });
    if (article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.some(i => i.uid === uid);
        if (canUpvote) {
            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1 },
                $push: { upvoteIds: { uid } }
            });
        }

        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json(updatedArticle)
    }
    else {
        res.status(404).send("That article was not found :(")
    }
})

app.post('/api/articles/:name/comment', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    const { email } = req.user;

    if (email) {
        await db.collection('articles').updateOne({ name }, {
            $push: { comments: { text, postedBy: email } }
        });
    }

    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.json(article)
    }
    else {
        res.status(404).send("That article was not found :(")
    }
})

const PORT = process.env.PORT || 8000

connectToDb(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.hepaui9.mongodb.net/?retryWrites=true&w=majority`, 'blog-db', () => {
    console.log("connected to blog-db");
    app.listen(PORT, () => {
        console.log("blog-app backend running on port" + PORT)
    });
})
