"use strict";
// import { Request, Response, NextFunction } from "express";
// import { body, validationResult } from "express-validator";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorMyUserRequest = void 0;
const express_validator_1 = require("express-validator");
// Explicitly define handleValidationErrors as a RequestHandler
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
// Ensure all middleware are of type ValidationChain or RequestHandler
exports.validatorMyUserRequest = [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("Name must be a String"),
    (0, express_validator_1.body)("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
    (0, express_validator_1.body)("city").isString().notEmpty().withMessage("City must be a string"),
    (0, express_validator_1.body)("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationErrors, // Ensure this is treated as middleware
];
