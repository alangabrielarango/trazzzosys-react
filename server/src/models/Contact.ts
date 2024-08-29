import { Schema, model } from 'mongoose';

interface IContact {
    name: string,
    nit: string,
    fullName: string,
    phone1: string,
    phone2: string,
    phone3: string,
    email: string,
    webPage: string,
    tags: string,
    hasAccount: boolean,
    isClient: boolean,
    isProvider: boolean,
    isWorker: boolean
}

const contactSchema = new Schema<IContact>({
    name: { type: String, required: true },
    nit: { type: String },
    fullName: { type: String },
    phone1: { type: String },
    phone2: { type: String },
    phone3: { type: String },
    email: { type: String },
    webPage: { type: String },
    tags: { type: String },
    hasAccount: { type: Boolean },
    isClient: { type: Boolean },
    isProvider: { type: Boolean },
    isWorker: { type: Boolean },
});

const Contact = model<IContact>('Contact', contactSchema);

export default Contact;
