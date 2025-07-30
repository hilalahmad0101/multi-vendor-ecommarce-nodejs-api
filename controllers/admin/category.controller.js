import CategoryModel from "../../model/Category.model.js";

class CategoryController {
    // Create
    static create = async (req, res) => {
        try {
            const { icon, name, slug, status } = req.body;

            // Check if name already exists
            const existingName = await CategoryModel.findOne({ name });
            if (existingName) {
                return res.status(409).json({
                    success: false,
                    message: "Category name already exists"
                });
            }

            // Check if slug already exists
            const existingSlug = await CategoryModel.findOne({ slug });
            if (existingSlug) {
                return res.status(409).json({
                    success: false,
                    message: "Category slug already exists"
                });
            }

            const newCategory = await CategoryModel.create({ icon, name, slug, status });

            return res.status(201).json({
                success: true,
                message: "Category created successfully",
                data: newCategory
            });
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    };


    // Read All
    static getAll = async (req, res) => {
        try {
            const categories = await CategoryModel.find().sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                message: "Categories retrieved successfully",
                data: categories
            });
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    // Read Single
    static getById = async (req, res) => {
        try {
            const { id } = req.params;

            const category = await CategoryModel.findById(id);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Category retrieved successfully",
                data: category
            });
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    // Update
    static update = async (req, res) => {
        try {
            const { id } = req.params;
            const { icon, name, slug, status } = req.body;

            // Check if another category with same name exists
            const existingByName = await CategoryModel.findOne({ name, _id: { $ne: id } });
            if (existingByName) {
                return res.status(409).json({
                    success: false,
                    message: "Category name must be unique"
                });
            }

            // Check if another category with same slug exists
            const existingBySlug = await CategoryModel.findOne({ slug, _id: { $ne: id } });
            if (existingBySlug) {
                return res.status(409).json({
                    success: false,
                    message: "Category slug must be unique"
                });
            }

            const updated = await CategoryModel.findByIdAndUpdate(
                id,
                { icon, name, slug, status },
                { new: true, runValidators: true }
            );

            if (!updated) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Category updated successfully",
                data: updated
            });

        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }


    // Delete
    static delete = async (req, res) => {
        try {
            const { id } = req.params;

            const deleted = await CategoryModel.findByIdAndDelete(id);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Category deleted successfully"
            });
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }
}

export default CategoryController;
