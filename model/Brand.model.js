import mongoose from "mongoose";
const BrandSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    rating: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
        required: true,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt
});

const BrandModel = mongoose.model('Brand', BrandSchema);

export default BrandModel;