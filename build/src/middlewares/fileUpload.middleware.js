"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileMiddleware = void 0;
const formidable_1 = __importDefault(require("formidable"));
const Error_Lib_1 = __importDefault(require("../libs/Error.Lib"));
const uploadFileMiddleware = (req, res, next) => {
    const form = (0, formidable_1.default)({ multiples: false });
    form.parse(req, (err, fields, files) => {
        if (err) {
            throw new Error_Lib_1.default('Error parsing file data', 400);
        }
        // Retrieve the file from the Formidable parsed files
        const file = Array.isArray(files['file']) ? files['file'][0] : files['file'];
        if (!file) {
            throw new Error_Lib_1.default('No file uploaded', 400);
        }
        // Attach the parsed form data to the request object
        req.file = file; // Attach uploaded file
        next();
    });
};
exports.uploadFileMiddleware = uploadFileMiddleware;
