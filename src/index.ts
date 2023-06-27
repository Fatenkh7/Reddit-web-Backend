import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import createError from 'http-errors';
import { AppDataSource } from './data-source';
import bodyParser from 'body-parser';
import userRoute from './route/user-route';
import mediaRoute from './route/media-route';
import postRoute from "./route/post-route";
import commentRoute from './route/comment-route';
import voteRoute from './route/vote-route';
import topicRoute from './route/topic-route';
import savedPostRoute from './route/saved-post-route';
import subscriptionRoute from './route/subscription-route';
import dotenv from "dotenv"
dotenv.config()

const app = express();
const port = process.env.Port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize database connection
AppDataSource.initialize()
    .then(async () => {
        console.log('Database connection established successfully!');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('API is running....');
});

app.use('/user', userRoute);
app.use('/upload', mediaRoute);
app.use('/post', postRoute);
app.use('/comment', commentRoute);
app.use('/vote', voteRoute);
app.use('/topic', topicRoute);
app.use('/saved', savedPostRoute);
app.use('/subscription', subscriptionRoute);


// 404 Not Found handler
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

// Error handler
// app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
//   console.log(err);
//   res.status(err.status || 500).send({
//     success: false,
//     message: err.message,
//   });
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


///handling errors
