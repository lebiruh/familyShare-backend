import express from 'express';
import cors from 'cors';
import sanitize from 'sanitize';
import dotenv from 'dotenv';
dotenv.config();
import userByEmailRoutes from "./routes/userByEmail.route.js";
import userByIdRoutes from "./routes/userById.route.js";
import authRoutes from "./routes/auth.route.js";
import confirmEmailRoutes from "./routes/confirmEmail.route.js";
import getFamilyRoutes from './routes/getFamily.route.js';
import getpostsRoute from './routes/getposts.route.js';
import addpostRoute from './routes/addpost.route.js';
import deletepostRoute from './routes/deletePost.route.js';
import addLikeRoute from './routes/addLikes.route.js';
import getLikesRoute from './routes/getLikes.route.js';
import commentsRoute from './routes/coments.route.js';
import getFamilyMembersRoutes from './routes/getFamilyMembers.route.js';
import searchUserRoute from './routes/searchUser.route.js';
import addFamilyMemberRoute from './routes/addFamilyMember.route.js';
import removeLikeRoute from './routes/removeLike.route.js';
import createFamilyRoute from './routes/createFamily.route.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer, { memoryStorage } from "multer";
import sharp from 'sharp';


const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(sanitize.middleware);

app.use(express.json());

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_S3_REGION
})

const storage = memoryStorage();
const upload = multer({storage});

// const upload = multer({
//   storage: multerS3({
//     s3: s3Client,
//     bucket: process.env.AWS_S3_BUCKET,
//     acl: 'public-read',
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname})
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now() + file.originalname)
//     }
//   })
// })

app.post('/api/upload', upload.single('image'), async (req, res) => {

  const { file } = req;

  const optimizedImage = await sharp(file.buffer).jpeg({quality:80}).toBuffer();

  const key = `uploads/${Date.now().toString()}-${file.originalname}`

  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      // Body: file.buffer,
      Body: optimizedImage
    }

    const command = new PutObjectCommand(params)

    await s3Client.send(command)

    res.send(key);

  } catch (err) {
    res.status(500).send('error uploading file')    
  }
})



app.use('/api/auth', authRoutes);
app.use("/api/users", userByEmailRoutes);
app.use("/api/user", userByIdRoutes);
app.use("/api/confirm", confirmEmailRoutes);
app.use("/api/getFamily", getFamilyRoutes);
app.use("/api/getFamilyMembers", getFamilyMembersRoutes);
app.use("/api/addFamilyMember", addFamilyMemberRoute);
app.use('/api/createFamily', createFamilyRoute);
app.use("/api/posts", getpostsRoute);
app.use("/api/post", addpostRoute);
app.use("/api/deletePost", deletepostRoute);
app.use('/api/addlike', addLikeRoute);
app.use('/api/removelike', removeLikeRoute);
app.use('/api/getlikes', getLikesRoute);
app.use('/api/comments', commentsRoute);
app.use('/api/search', searchUserRoute);



app.listen(port, () => {
  console.log(`listening on port ${port}`)
});