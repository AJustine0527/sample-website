import mongoose from 'mongoose'
const Schema = mongoose.Schema

const memberSchema = new Schema({
    first_name: { type: String, default: "" },
    middle_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    full_name: { type: String, default: "" },
    gender: { type: String, default: "" },
    birth_date: { type: Date, default: null },
    date_registered: { type: Date, default: null },
    mobile_number: { type: String, default: "" },
    email_address: { type: String, default: "" },
    account_type: { type: Number, default: 0 },
    username: { type: String, default: "" },
    password: { type: String, default: "" },
    is_life_force_member: { type: Boolean, default: false },
    life_force_id_number: { type: String, default: "" },
    life_force_enroller: { type: String, default: "" },
    life_force_enroller_id: { type: String, default: "" },
    verification_status: { type: Number, default: -1 },
    referror_id: { type: Schema.Types.ObjectId, ref: "member", default: null },
    status: { type: Number, default: null },
    photo_thumb: { type: String, default: "" },
    plain_pwd: { type: String, default: "" },

    // ADDRESS

    region: { type: Schema.Types.ObjectId, ref: "philex_region", default: null },
    province: { type: Schema.Types.ObjectId, ref: "philex_province", default: null },
    city: { type: Schema.Types.ObjectId, ref: "philex_city", default: null },
    brgy: { type: Schema.Types.ObjectId, ref: "philex_barangay", default: null },
    address_line_2: { type: String, default: "" },
    address_line_1: { type: String, default: "" },
    postal: { type: String, default: "" },
    default_account: { type: Boolean, default: false }

}, { toJSON: { virtuals: true } });

memberSchema.virtual('value').get(function () {
    return this.id;
})
memberSchema.virtual('label').get(function () {
    return "Depot - " + this.full_name;
})

export default mongoose.model("member", memberSchema)

//account_type
//0 - Guest/Customer
//1 - Loyal Customer
//2 - BB Seller
//3 - Depot

//verification_status
//0 - Not verified
//1 - Verified

//status
//0 - Introducer
//1 - Elite Marketer
//2 - Bronze
//3 - Diamond