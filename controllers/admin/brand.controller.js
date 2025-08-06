import { dataResponse, successResponse, errorResponse } from '../../helper/helper.js'
import BrandModel from '../../model/Brand.model.js';
class BrandController {
    static create = async (req, res) => {
        try {
            const { name, slug, rating, status } = req.body;
            const file = req.file;
            if (!file) {
                return errorResponse(res, 422, 'File field is required')
            }

            const brand = new BrandModel({
                name,
                slug,
                rating,
                status,
                logo: file.filename
            })

            await brand.save();

            return successResponse(res, 201, 'Brand create successfully')
        } catch (e) {
            return errorResponse(res, 500, e.message)
        }
    }

    // READ ALL
    static getAll = async (req, res) => {
        try {
            const brands = await BrandModel.find();
            return dataResponse(res, 200, brands, 'Brand list');
        } catch (e) {
            return errorResponse(res, 500, e.message);
        }
    }

    // READ ONE
    static getOne = async (req, res) => {
        try {
            const brand = await BrandModel.findById(req.params.id);
            if (!brand) return errorResponse(res, 404, 'Brand not found');
            return dataResponse(res, 200, brand, 'Brand details');
        } catch (e) {
            return errorResponse(res, 500, e.message);
        }
    }

    // UPDATE
    static update = async (req, res) => {
        try {
            const { name, slug, rating, status } = req.body;
            const file = req.file;

            const brand = await BrandModel.findById(req.params.id);
            if (!brand) return errorResponse(res, 404, 'Brand not found');

            if (file) {
                // Delete old file
                const oldPath = path.join('uploads', brand.logo);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                brand.logo = file.filename;
            }

            brand.name = name ?? brand.name;
            brand.slug = slug ?? brand.slug;
            brand.rating = rating ?? brand.rating;
            brand.status = status ?? brand.status;

            await brand.save();
            return dataResponse(res, 200, brand, 'Brand updated successfully',);
        } catch (e) {
            return errorResponse(res, 500, e.message);
        }
    }

    // DELETE
    static delete = async (req, res) => {
        try {
            const brand = await BrandModel.findById(req.params.id);
            if (!brand) return errorResponse(res, 404, 'Brand not found');

            const filePath = path.join('uploads', brand.logo);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

            await BrandModel.deleteOne({ _id: req.params.id });
            return successResponse(res, 200, 'Brand deleted successfully');
        } catch (e) {
            return errorResponse(res, 500, e.message);
        }
    }

    static updateBrandStatus = async (req, res) => {
        try {
            const brand = req.params.id;
            const status = await updateStatus(BrandModel, brand);
            if (!status) {
                return errorResponse(res, 404, 'Not found');
            }

            return successResponse(res, 200, `Status ${status} successfully`)
        } catch (e) {
            return errorResponse(res, 500, e.message)
        }
    }
}

export default BrandController;