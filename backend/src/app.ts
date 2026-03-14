import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import languageRoutes from './routes/languages.routes';
import categoryRoutes from './routes/categories.routes';
import snippetRoutes from './routes/snippets.routes';
import lessonRoutes from './routes/lessons.routes';
import compilerRoutes from './routes/compiler.routes';
import aiRoutes from './routes/ai.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/snippets', snippetRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/compiler', compilerRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'KillanyCode Backend is running' });
});

export default app;
