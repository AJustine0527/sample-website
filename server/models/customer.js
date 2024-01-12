import mongoose from 'mongoose'
const Schema = mongoose.Schema

const customerSchema = new Schema({
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    email_address: { type: String, default: "" },
    password: { type: String, default: "" },
    date_signup: { type: Date, default: null }
});

export default mongoose.model("customer", customerSchema)