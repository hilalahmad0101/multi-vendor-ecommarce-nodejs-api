import BrandController from "../../controllers/admin/brand.controller.js";
import CategoryController from "../../controllers/admin/category.controller.js";
import ChildCategoryController from "../../controllers/admin/childcategory.controller.js";
import SubCategoryController from "../../controllers/admin/subcategory.controller.js";
import { upload } from "../../helper/helper.js";
import { roleAuthMiddleware } from "../../middlewares/role.auth.middleware.js";

export const adminRoutes = (app) => {
    // category routes
    const adminUrl = '/api/admin/';
    const permission = ['admin'];
    app.post(`${adminUrl}category`, roleAuthMiddleware(permission), CategoryController.create);
    app.get(`${adminUrl}category`, roleAuthMiddleware(permission), CategoryController.getAll);
    app.get(`${adminUrl}category/:id`, roleAuthMiddleware(permission), CategoryController.getById);
    app.put(`${adminUrl}category/:id`, roleAuthMiddleware(permission), CategoryController.update);
    app.delete(`${adminUrl}category/:id`, roleAuthMiddleware(permission), CategoryController.delete);
    app.put(`${adminUrl}category/status/:id`, roleAuthMiddleware(permission), CategoryController.updateCategoryStatus);


    // sub category
    app.post(`${adminUrl}sub-category`, roleAuthMiddleware(permission), SubCategoryController.create);
    app.get(`${adminUrl}sub-category`, roleAuthMiddleware(permission), SubCategoryController.getAll);
    app.get(`${adminUrl}sub-category/:id`, roleAuthMiddleware(permission), SubCategoryController.getById);
    app.put(`${adminUrl}sub-category/:id`, roleAuthMiddleware(permission), SubCategoryController.update);
    app.delete(`${adminUrl}sub-category/:id`, roleAuthMiddleware(permission), SubCategoryController.delete);
    app.put(`${adminUrl}sub-category/status/:id`, roleAuthMiddleware(permission), SubCategoryController.updateSubCategoryStatus);


    // child category
    app.post(`${adminUrl}child-category`, roleAuthMiddleware(permission), ChildCategoryController.create);
    app.get(`${adminUrl}child-category`, roleAuthMiddleware(permission), ChildCategoryController.getAll);
    app.get(`${adminUrl}child-category/:id`, roleAuthMiddleware(permission), ChildCategoryController.getOne);
    app.put(`${adminUrl}child-category/:id`, roleAuthMiddleware(permission), ChildCategoryController.update);
    app.delete(`${adminUrl}child-category/:id`, roleAuthMiddleware(permission), ChildCategoryController.delete);
    app.post(`${adminUrl}sub-categories-by-category`, roleAuthMiddleware(permission), ChildCategoryController.getSubCategory);
    app.put(`${adminUrl}child-category/status/:id`, roleAuthMiddleware(permission), ChildCategoryController.updateChildCategoryStatus);

    // Brands
    app.post(`${adminUrl}brand`, roleAuthMiddleware(permission), upload.single('file'), BrandController.create);
    app.get(`${adminUrl}brand`, roleAuthMiddleware(permission), BrandController.getAll);
    app.get(`${adminUrl}brand/:id`, roleAuthMiddleware(permission), BrandController.getOne);
    app.put(`${adminUrl}brand/:id`, roleAuthMiddleware(permission), upload.single('file'), BrandController.update);
    app.delete(`${adminUrl}brand/:id`, roleAuthMiddleware(permission), BrandController.delete);
    app.put(`${adminUrl}brand/status/:id`, roleAuthMiddleware(permission), BrandController.updateBrandStatus);
}