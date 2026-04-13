import mongoose, {Schema, model, Document} from "mongoose";

//interface para criar o esquema do usuário e importar
export interface IInscription extends Document {
    user: mongoose.Types.ObjectId;
    event: mongoose.Types.ObjectId;
    createdAt: Date;
    status: string;
}

//esquema no moongoose para criar o modelo do usuário
const InscriptionSchema: Schema = new Schema({
    user: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    event: {type: mongoose.Types.ObjectId, ref: "Event", required: true},
    createdAt: {type: Date, default: Date.now},
    status: {type: String, default: 'confirmed'}
});

export const Inscription = model<IInscription>('Inscription', InscriptionSchema);