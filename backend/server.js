import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import errorMiddleware  from './middleware/errorMiddleware.js'
const { errorHandler } = errorMiddleware
import connectDB from './config/db.js'
import goalRoutes from './routes/goalRoutes.js'
import userRoutes from './routes/userRoutes.js'

const port = process.env.PORT || 5000
connectDB()
// 设置CORS选项
const corsOptions = {
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  origin: 'http://127.0.0.1:8080',
  credentials: true
}

// 获取当前模块的 URL
const currentModuleUrl = import.meta.url;
// 获取当前模块的目录路径
const currentDirectory = dirname(fileURLToPath(currentModuleUrl));
const app = express()
// 使用中间件
app.use(cors(corsOptions))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(currentDirectory, "../frontend/build")));

  app.get("*", (_req, res) =>
    res.sendFile(
      path.resolve(currentDirectory, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (_req, res) => res.send("Please set to production"));
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
