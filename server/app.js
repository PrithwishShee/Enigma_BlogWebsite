  const express = require('express');

  const app = express()
  require('dotenv').config()

  const {StatusCodes} = require('http-status-codes')
  const fileupload = require('express-fileupload')
  const cloudinary = require('cloudinary').v2

  // Configuring cloudinary
  cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
  })

  // Importing the Post model
  const Post = require("./models/Post")

  // Try Catch wrapper for async route handlers
  require('express-async-errors')

  // db
  const connectDB = require('./db/connect');

  // Routers
  const PostsRouter = require('./routes/PostsRouter');
  const AuthRouter = require('./routes/AuthRouter');

  //Importing Middlewares
  const customErrorHandler = require("./middlewares/custom-error");
  const authenticationMiddleware = require('./middlewares/authenticate');
  const UserRouter = require('./routes/UserRouter');
const User = require('./models/User');

  // Defining some routes directly
  app.get("/",(req,res)=>{
      res.send("VAT PROJECT")
  })

  // Creating GET all posts route outside router (containing auth middleware) so that anyone can get all posts without authentication
  app.get("/api/v1/posts",async(req,res)=>{
    const posts = await Post.find({})
    res.status(StatusCodes.OK).json({success:true,PostCount:posts.length,posts})
  })

 // Creating GET single post route outside router (containing auth middleware) so that anyone can get a specific post without authentication
  app.get("/api/v1/posts/:id",async(req,res) =>{
    const postID = req.params.id;
    const post = await Post.findById(postID)
    if(!post){
      throw new NotFoundError("Post Not Found")
      }
    res.status(StatusCodes.OK).json({success:true,post})
})

  // Middlewares
  app.use(express.json())
  app.use(fileupload({useTempFiles:true}))
  // Routers
  app.use("/api/v1/posts",authenticationMiddleware,PostsRouter)
  app.use("/api/v1/auth",AuthRouter)
  app.use("/api/v1/profile",UserRouter)
  app.use(customErrorHandler)
  // Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  // Customize error response based on error type or default to 500
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Something went wrong',
  });
});


  const port = process.env.PORT || 5000;

 

  const start = async() =>{
      try {
          await connectDB(process.env.MONGO_URI)
          console.log("Connection to DB successfully established.");
        app.listen(port,()=>{
          console.log(`Server is listening for requests on Port ${port}.`);
        })  
      } catch (error) {
          console.log(error);
      }
  }

  start()
  module.exports = app
// Do NOT call app.listen(port,...) in Vercel
