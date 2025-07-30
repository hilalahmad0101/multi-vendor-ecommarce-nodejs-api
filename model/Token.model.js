import mongoose from "mongoose";


const TokenSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'users' },
    token: { type: String, require: true, trim: true }
})

const TokenModel = mongoose.model('tokens', TokenSchema);

export default TokenModel;