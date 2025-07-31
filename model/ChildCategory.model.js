import mongoose from "mongoose";

const ChildCategorySchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },

    sub_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: [true, 'Category is required']
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
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
        required: true,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt
});

const ChildCategoryModel = mongoose.model('ChildCategory', ChildCategorySchema);

export default ChildCategoryModel;