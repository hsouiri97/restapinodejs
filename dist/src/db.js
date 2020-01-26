"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class DB {
    static connect() {
        const uri = "mongodb+srv://root:UvCrp0WWUKPZYa09@cluster0-4mnvg.mongodb.net/library?retryWrites=true&w=majority";
        mongoose_1.default
            .connect(uri, {
            useNewUrlParser: true
        })
            .catch(err => {
            console.log("here is the error", err);
        });
    }
}
exports.default = DB;
