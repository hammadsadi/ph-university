"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const admin_controllers_1 = require("./admin.controllers");
const admin_validation_1 = require("./admin.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
// Route init
const route = (0, express_1.Router)();
// Get All Student
route.get('/', admin_controllers_1.AdminControllers.getAllAdmin);
route.get('/:id', admin_controllers_1.AdminControllers.getSingleAdmin);
route.patch('/:id', (0, validateRequest_1.default)(admin_validation_1.AdminValidationSchemas.updateValidationAdminSchema), admin_controllers_1.AdminControllers.updateSingleAdmin);
route.delete('/:id', admin_controllers_1.AdminControllers.deleteSingleAdmin);
exports.AdminRoutes = route;
