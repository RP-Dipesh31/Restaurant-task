"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMyRestaurantRequest = void 0;
const express_validator_1 = require("express-validator");
// Handle any validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
// Create an array of validators and middleware
const validations = [
    (0, express_validator_1.body)("restaurantName")
        .isString()
        .notEmpty()
        .withMessage("Restaurant name is required"),
    (0, express_validator_1.body)("city")
        .isString()
        .notEmpty()
        .withMessage("City is required"),
    (0, express_validator_1.body)("country")
        .isString()
        .notEmpty()
        .withMessage("Country is required"),
    (0, express_validator_1.body)("deliveryPrice")
        .isNumeric()
        .withMessage("Delivery price must be a valid number"),
    (0, express_validator_1.body)("estimatedDeliveryTime")
        .isNumeric()
        .withMessage("Estimated delivery time must be a valid number"),
    (0, express_validator_1.body)("cuisines").custom((value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            throw new Error("Please select at least one cuisine");
        }
        return true;
    }),
    (0, express_validator_1.body)("menuItems").custom((value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            throw new Error("At least one menu item is required");
        }
        return true;
    }),
    // Check that an image file was uploaded (multer places the file in req.file)
    (0, express_validator_1.body)("imageFile").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Image file is required");
        }
        return true;
    }),
    handleValidationErrors,
];
// Cast the array to RequestHandler[] to satisfy TypeScript's type-checking
exports.validateMyRestaurantRequest = validations;
