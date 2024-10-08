import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js';


const app = express();

// Middleware
app.use(bodyParser.json());

// // Routes
app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);


// Admin routes
app.use('/api/admins', adminRoutes);



export default app;
