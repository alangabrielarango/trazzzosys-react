import mongoose, { Schema, model } from 'mongoose';

interface IAccounts {
    name: string,
    type: string,
    bank: string,
    number: string,
    contact: Schema.Types.ObjectId,
}

const accountSchema = new Schema<IAccounts>({
    name: { type: String, required: true },
    type: { type: String },
    bank: { type: String },
    number: { type: String },
    contact: { type: Schema.Types.ObjectId, ref: 'Contact' },
});

const Account = model<IAccounts>('Account', accountSchema);

export default Account;
