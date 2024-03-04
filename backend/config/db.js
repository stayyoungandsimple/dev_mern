import { connect } from 'mongoose'
import chalk  from "chalk"

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI)
    console.log(chalk.cyan.underline(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB
