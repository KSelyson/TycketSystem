import {Schema, model, Document} from "mongoose";

//interface para criar o esquema do usuário e importar
export interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
    location: string;
    max_participants: number;
    category_id: number;
    createdBy_id: number;
    createdAt: Date;
}

//esquema no moongoose para criar o modelo do usuário
const EventSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true},
    max_participants: {type: Number, required: true},
    category_id: {type: Number, required: true},
    createdBy_id: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now}
});

export const Event = model<IEvent>('Event', EventSchema);
