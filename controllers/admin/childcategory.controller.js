import { dataResponse, errorResponse, successResponse } from "../../helper/helper.js";
import CategoryModel from "../../model/Category.model.js";
import SubCategoryModel from "../../model/SubCategory.model.js";
import ChildCategoryModel from "../../model/ChildCategory.model.js";

class ChildCategoryController {

    // Get Subcategories by Category ID
    static getSubCategory = async (req, res) => {
        try {
            const { category } = req.body;
            const sub_categories = await SubCategoryModel.find({ category });
            return dataResponse(res, 200, sub_categories, 'Subcategories fetched successfully');
        } catch (e) {
            return errorResponse(res, 500, e.message);
        }
    };

    // Create Child Category
    static create = async (req, res) => {
        try {
            const { category, sub_category, name, slug, status } = req.body;

            const categoryExists = await CategoryModel.findById(category);
            if (!categoryExists) {
                return res.status(400).json({ success: false, message: 'Invalid category ID' });
            }

            const subCategoryExists = await SubCategoryModel.findById(sub_category);
            if (!subCategoryExists) {
                return res.status(400).json({ success: false, message: 'Invalid subcategory ID' });
            }

            const nameExists = await ChildCategoryModel.findOne({ name });
            if (nameExists) {
                return res.status(409).json({ success: false, message: 'Name already exists' });
            }

            const slugExists = await ChildCategoryModel.findOne({ slug });
            if (slugExists) {
                return res.status(409).json({ success: false, message: 'Slug already exists' });
            }

            await ChildCategoryModel.create({ category, sub_category, name, slug, status });

            return successResponse(res, 201, 'Child category successfully created');
        } catch (e) {
            return errorResponse(res, 500, e.message);
        }
    };

    // Get All Child Categories
    static getAll = async (req, res) => {
        try {
            const childCategories = await ChildCategoryModel.find()
                .populate("category sub_category")
                .sort({ createdAt: -1 });

            return dataResponse(res, 200, childCategories, 'Child categories fetched successfully');
        } catch (e) {
            return errorResponse(res, 500, e.message);
        }
    };

    // Get Single Child Category
    static getOne = async (req, res) => {
        try {
            const { id } = req.params;
            const childCategory = await ChildCategoryModel.findById(id).populate("category sub_category");

            if (!childCategory) {
                return res.status(404).json({ success: false, message: 'Child category not found' });
            }

            return dataResponse(res, 200, childCategory, 'Child category fetched successfully');
        } catch (e) {
            return errorResponse(res, 500, e.message);
        }
    };

    // Update Child Category
    static update = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, slug, status, category, sub_category } = req.body;

            const childCategory = await ChildCategoryModel.findById(id);
            if (!childCategory) {
                return res.status(404).json({ success: false, message: 'Child category not found' });
            }

            if (name) {
                const nameExists = await ChildCategoryModel.findOne({ name, _id: { $ne: id } });
                if (nameExists) {
                    return res.status(409).json({ success: false, message: 'Name already exists' });
                }
                childCategory.name = name;
            }

            if (slug) {
                const slugExists = await ChildCategoryModel.findOne({ slug, _id: { $ne: id } });
                if (slugExists) {
                    return res.status(409).json({ success: false, message: 'Slug already exists' });
                }
                childCategory.slug = slug;
            }

            if (status !== undefined) childCategory.status = status;
            if (category) childCategory.category = category;
            if (sub_category) childCategory.sub_category = sub_category;

            await childCategory.save();

            return successResponse(res, 200, 'Child category updated successfully');
        } catch (e) {
            return errorResponse(res, 500, e.message);
        }
    };

    // Delete Child Category
    static delete = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await ChildCategoryModel.findByIdAndDelete(id);

            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Child category not found' });
            }

            return successResponse(res, 200, 'Child category deleted successfully');
        } catch (e) {
            return errorResponse(res, 500, e.message);
        }
    };
}

export default ChildCategoryController;
