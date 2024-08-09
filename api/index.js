import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import UserRoutes from './Routes/UserRoutes.js'
import AuthRoutes from './Routes/AuthRoutes.js'
import PostRoutes from './Routes/PostRoutes.js'
import CommentRoutes from './Routes/CommnetRoutes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Mongo DB Connected Successfully');
}).catch(err => {
    console.log(err);
});


const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
    console.log('Server is running on 3000 port !');
})

app.use('/api/user', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/post',PostRoutes);
app.use('/api/comment',CommentRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})