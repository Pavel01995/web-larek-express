import express from 'express';
import cors from 'cors';
import  mongoose from 'mongoose';
import Router from './routes/product';




const app = express();
app.use(cors());
app.use(express.json());
app.use('/product', Router);

const start =async()=>{
try{
  await mongoose.connect('mongodb://127.0.0.1:27017/weblarek');
  console.log('MongoDB connected');

  app.listen(3000,()=>{
    console.log('Server started on port 3000');
});
} catch(error){
  console.log('Error connecting to MongoDB:', error);


}
}
start();