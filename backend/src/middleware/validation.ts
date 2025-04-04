
<<<<<<< HEAD
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
=======
// import { Request, Response, NextFunction } from "express";
// import { body, validationResult } from "express-validator";

// const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()});
//     }
//     next();
// }

// export const validatorMyUserRequest = [
//     body("name").isString().notEmpty().withMessage("Name must be a String"),
//     body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
//     body("city").isString().notEmpty().withMessage("City must be a string"),
//     body("country").isString().notEmpty().withMessage("Country must be a string"),
//     handleValidationErrors,
// ]

import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";

// Explicitly define handleValidationErrors as a RequestHandler
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Ensure all middleware are of type ValidationChain or RequestHandler
export const validatorMyUserRequest: (ValidationChain | ((req: Request, res: Response, next: NextFunction) => void))[] = [
    body("name").isString().notEmpty().withMessage("Name must be a String"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationErrors, // Ensure this is treated as middleware
];


export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("city").notEmpty().withMessage("Restaurant name is required"),
    body("country").notEmpty().withMessage("Country name is required"),
    body("deliveryPrice").isFloat({min:0}).withMessage("Delivery price must be a positive number"),
    body("estimatedDeliveryTime").isInt({min:0}).withMessage("Estimated delivery time must be a positive number"),
    body("cuisines").isArray().withMessage("Cusines must be an array").not().isEmpty().withMessage("Cusines must not be empty"),
    body("menuItems").isArray().withMessage("Menu items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price").isFloat({min:0}).notEmpty().withMessage("Menu item price is required and must be a positive number"),
    handleValidationErrors,

];
>>>>>>> 6d3fbd6a518b8cbe988a913d33a389d1053a9c61
