import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
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

const CategoryModel = mongoose.model('Category', CategorySchema);
export default CategoryModel;
