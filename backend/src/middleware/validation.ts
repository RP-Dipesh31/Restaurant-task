
// "use strict";
// import { Request, Response, NextFunction, RequestHandler } from "express";
// import { body, validationResult } from "express-validator";

// // Handle any validation errors
// const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.status(400).json({ errors: errors.array() });
//         return;
//     }
//     next();
// };

// // Create an array of validators and middleware
// const validations = [
//     body("restaurantName")
//         .isString()
//         .notEmpty()
//         .withMessage("Restaurant name is required"),
//     body("city")
//         .isString()
//         .notEmpty()
//         .withMessage("City is required"),
//     body("country")
//         .isString()
//         .notEmpty()
//         .withMessage("Country is required"),
//     body("deliveryPrice")
//         .isNumeric()
//         .withMessage("Delivery price must be a valid number"),
//     body("estimatedDeliveryTime")
//         .isNumeric()
//         .withMessage("Estimated delivery time must be a valid number"),
//     body("cuisines").custom((value: unknown) => {
//         if (!value || (Array.isArray(value) && value.length === 0)) {
//             throw new Error("Please select at least one cuisine");
//         }
//         return true;
//     }),
//     body("menuItems").custom((value) => {
//         if (!value || (Array.isArray(value) && value.length === 0)) {
//             throw new Error("At least one menu item is required");
//         }
//         return true;
//     }),
//     // Check that an image file was uploaded (multer places the file in req.file)
//     body("imageFile").custom((value: unknown, { req }: { req: Request }) => {
//         if (!req.file) {
//             throw new Error("Image file is required");
//         }
//         return true;
//     }),
//     handleValidationErrors,
// ];

// // Cast the array to RequestHandler[] to satisfy TypeScript's type-checking
// export const validateMyRestaurantRequest = validations as RequestHandler[];
