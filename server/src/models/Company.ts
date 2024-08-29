import { Schema, model } from 'mongoose';

interface ICompany {
    name: string,
    nit: string,
    fullName: string,
}

const companySchema = new Schema<ICompany>({
    name: { type: String, required: true },
    nit: { type: String },
    fullName: { type: String },
});

const Company = model<ICompany>('Company', companySchema);

export default Company;
