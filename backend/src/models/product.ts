import mongoose, { Schema } from 'mongoose';

export interface IProduct {
  title: string;
  category: string;
  image: { fileName: string, originalName: string; },
  description?: string;
  price: number|null;
}

const productSchema = new Schema<IProduct>({
   title: {
    type: String,
    minlength: [2, 'минимальная длина поля title 2 символа'],
    maxlength: [30, 'максимальная длина поля title 30 символов'],
    required: [true, 'Поле title должно быть заполнено'],
    unique: true,
  },
  category: {
    type: String,
    required: [true, 'Поле category должно быть заполнено'],
  },
  image: {
    fileName: { type: String, required: [true, 'Поле fileName обязательно для заполнения'] },
    originalName: { type: String, required: [true, 'Поле originalName обязательно для заполнения'] },
  },

  description: {
    type: String,
    required: false,

  },
  price: {
    type: Number,
    required: false,
    default: null,
  },
});

export default mongoose.model<IProduct>('product', productSchema);
