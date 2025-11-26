import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aadharNumber: { type: String, required: true, unique: true },
    profileImage: { type: String },
    aadharfrontSide: { type: String },
    aadharBackSide: { type: String },
    paymentQr: { type: String },
    bankName: {type:String},
    accountNumber: {type:String},
    referelNumber: {type:String},
    ifscCode: {type:String},
    phonePayNumber:{type:String},
    isPaymentConfirm: { type: Boolean, required: true, default: false },
    isAdmin: { type: Boolean, required: true, default: false },
    paymeName: { type: String },
    district: {
      type: String,

      default: "बुलडाणा",
    },
    subdivision: {
      type: String,

      default: "नांदुरा",
    },
    village: {
      type: String,

      default: "निवडा",
    },

    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
