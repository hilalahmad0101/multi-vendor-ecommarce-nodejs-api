import CategoryController from "../../controllers/admin/category.controller.js";
import SubCategoryController from "../../controllers/admin/subcategory.controller.js";
import { roleAuthMiddleware } from "../../middlewares/role.auth.middleware.js";

export const adminRoutes = (app) => {
    // category routes
    app.post('/api/admin/category', roleAuthMiddleware(['admin']), CategoryController.create);
    app.get('/api/admin/category', roleAuthMiddleware(['admin']), CategoryController.getAll);
    app.get('/api/admin/category/:id', roleAuthMiddleware(['admin']), CategoryController.getById);
    app.put('/api/admin/category/:id', roleAuthMiddleware(['admin']), CategoryController.update);
    app.delete('/api/admin/category/:id', roleAuthMiddleware(['admin']), CategoryController.delete);


    // sub category

    app.post('/api/admin/sub-category', roleAuthMiddleware(['admin']), SubCategoryController.create);
    app.get('/api/admin/sub-category', roleAuthMiddleware(['admin']), SubCategoryController.getAll);
    app.get('/api/admin/sub-category/:id', roleAuthMiddleware(['admin']), SubCategoryController.getById);
    app.put('/api/admin/sub-category/:id', roleAuthMiddleware(['admin']), SubCategoryController.update);
    app.delete('/api/admin/sub-category/:id', roleAuthMiddleware(['admin']), SubCategoryController.delete);

}