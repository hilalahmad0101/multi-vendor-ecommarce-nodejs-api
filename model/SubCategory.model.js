import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    name: {
        type: String,
        required: [true, 'Sub Category name is required'],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
}, {
    timestamps: true
});

const SubCategoryModel = mongoose.model('SubCategory', subCategorySchema);
export default SubCategoryModel;
