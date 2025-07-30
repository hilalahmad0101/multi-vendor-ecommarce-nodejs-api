import CategoryModel from "../../model/Category.model.js";
import SubCategoryModel from "../../model/SubCategory.model.js";

class SubCategoryController {
    static create = async (req, res) => {
        try {
            const { category, name, slug, status } = req.body;

            // Check if category exists
            const categoryExists = await CategoryModel.findById(category);
            if (!categoryExists) {
                return res.status(400).json({ success: false, message: 'Invalid category ID' });
            }

            // Check for uniqueness
            const existingName = await SubCategoryModel.findOne({ name });
            if (existingName) {
                return res.status(409).json({ success: false, message: 'Subcategory name already exists' });
            }

            const existingSlug = await SubCategoryModel.findOne({ slug });
            if (existingSlug) {
                return res.status(409).json({ success: false, message: 'Slug already exists' });
            }

            const subCategory = await SubCategoryModel.create({ category, name, slug, status });

            return res.status(201).json({
                success: true,
                message: 'Subcategory created successfully',
                data: subCategory
            });
        } catch (e) {
            return res.status(500).json({ success: false, message: e.message });
        }
    };

    static getAll = async (req, res) => {
        try {
            const subCategories = await SubCategoryModel.find().populate('category', 'name');
            return res.status(200).json({ success: true, data: subCategories });
        } catch (e) {
            return res.status(500).json({ success: false, message: e.message });
        }
    };

    static getById = async (req, res) => {
        try {
            const { id } = req.params;
            const subCategory = await SubCategoryModel.findById(id).populate('category', 'name');

            if (!subCategory) {
                return res.status(404).json({ success: false, message: 'Subcategory not found' });
            }

            return res.status(200).json({ success: true, data: subCategory });
        } catch (e) {
            return res.status(500).json({ success: false, message: e.message });
        }
    };

    static update = async (req, res) => {
        try {
            const { id } = req.params;
            const { category, name, slug, status } = req.body;

            // Check if subcategory exists
            const existing = await SubCategoryModel.findById(id);
            if (!existing) {
                return res.status(404).json({ success: false, message: 'Subcategory not found' });
            }

            // Validate category
            if (category) {
                const categoryExists = await Category.findById(category);
                if (!categoryExists) {
                    return res.status(400).json({ success: false, message: 'Invalid category ID' });
                }
            }

            // Check for unique name if updated
            if (name && name !== existing.name) {
                const nameExists = await SubCategoryModel.findOne({ name });
                if (nameExists) {
                    return res.status(409).json({ success: false, message: 'Subcategory name already exists' });
                }
            }

            // Check for unique slug if updated
            if (slug && slug !== existing.slug) {
                const slugExists = await SubCategoryModel.findOne({ slug });
                if (slugExists) {
                    return res.status(409).json({ success: false, message: 'Slug already exists' });
                }
            }

            existing.category = category || existing.category;
            existing.name = name || existing.name;
            existing.slug = slug || existing.slug;
            existing.status = status || existing.status;

            await existing.save();

            return res.status(200).json({ success: true, message: 'Subcategory updated successfully', data: existing });
        } catch (e) {
            return res.status(500).json({ success: false, message: e.message });
        }
    };

    static delete = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await SubCategoryModel.findByIdAndDelete(id);

            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Subcategory not found' });
            }

            return res.status(200).json({ success: true, message: 'Subcategory deleted successfully' });
        } catch (e) {
            return res.status(500).json({ success: false, message: e.message });
        }
    };
}

export default SubCategoryController;