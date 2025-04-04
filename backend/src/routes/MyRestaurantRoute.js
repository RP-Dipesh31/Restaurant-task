"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const MyRestaurantController_1 = __importDefault(require("../controllers/MyRestaurantController"));
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router.get("/", (req, res) => {
    console.log("GET /api/restaurants called");
    MyRestaurantController_1.default.getRestaurants(req, res);
});
router.post("/", upload.single("imageFile"), validation_1.validateMyRestaurantRequest, (req, res) => {
    console.log("POST /api/restaurants called");
    MyRestaurantController_1.default.createMyRestaurant(req, res);
});
exports.default = router;
