import { Schema, model } from 'mongoose';

interface ICategory {
    name: string,
    sign: number,
}

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    sign: { type: Number },
});

const Category = model<ICategory>('Category', CategorySchema);

export default Category;
