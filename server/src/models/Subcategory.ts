import { Schema, model } from 'mongoose';

interface ISubcategory {
    name: string,
    sign: number,
    category: Schema.Types.ObjectId,
}

const SubcategorySchema = new Schema<ISubcategory>({
    name: { type: String, required: true },
    sign: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

const Subcategory = model<ISubcategory>('Subcategory', SubcategorySchema);

export default Subcategory;
