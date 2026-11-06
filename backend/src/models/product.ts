import mongoose, {model, Schema} from 'mongoose';



export interface IProduct {
  title: string;
  category: string;
  image: { fileName: string, originalName: string; },
  description?: string;
  price: number|null;
}



const productSchema = new Schema<IProduct>({
  title:{
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true
  },
  category:{
    type: String,
    required: true
  },
  image:{
    fileName: { type: String, required: true },
    originalName: { type: String, required: true }
  },
  
  description:{
    type: String,
    required:false,
    
  }, price:{
type : Number,
required: false,
default:null
  }
});

  


export default mongoose.model<IProduct>('product', productSchema);