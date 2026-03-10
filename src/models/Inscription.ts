import {Schema, model, Document} from "mongoose";

//interface para criar o esquema do usuário e importar
export interface IEvent extends Document {
    user_id: number;
    event_id: number;
    createdAt: Date;
    status: string;
}

//esquema no moongoose para criar o modelo do usuário
const InscriptionSchema: Schema = new Schema({
    user_id: {type: Number, required: true},
    event_id: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
    status: {type: String, default: 'confirmed'}
});

export const Inscription = model<IEvent>('Inscription', InscriptionSchema);