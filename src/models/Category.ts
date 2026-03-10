import {Schema, model, Document} from 'mongoose';

//interface para criar o esquema do usuário e importar
export interface ICategory extends Document {
    name: string;
    description: string;
};

//esquema no moongoose para criar o modelo do usuário
export const CategorySchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}
});

export const Category = model<ICategory>('Category', CategorySchema);