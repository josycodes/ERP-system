"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const Logger_Lib_1 = __importDefault(require("../libs/Logger.Lib"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});
class CloudinaryService {
    /**
     * File upload Function
     * @param path
     * @param options
     * @returns {Promise<string>}
     */
    uploadFile(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield cloudinary_1.v2.uploader.upload(path, options);
                return result.secure_url;
            }
            catch (error) {
                Logger_Lib_1.default.error('Error uploading file to Cloudinary', error);
                throw new Error('Error uploading file to Cloudinary');
            }
        });
    }
    uploadVideo(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Upload the Video
                const result = yield cloudinary_1.v2.uploader.upload(path, options);
                return result.secure_url;
            }
            catch (error) {
                console.log(error);
                throw new Error('Error uploading video to Cloudinary');
            }
        });
    }
}
exports.default = new CloudinaryService();