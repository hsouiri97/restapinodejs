"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const book_1 = __importDefault(require("../model/book"));
const body_parser_1 = __importDefault(require("body-parser"));
class Server {
    constructor(port) {
        this.port = port;
        db_1.default.connect();
    }
    start() {
        const app = express_1.default();
        app.use(body_parser_1.default.urlencoded({
            extended: false
        }));
        app.use(body_parser_1.default.json());
        app.get("/", (req, resp) => {
            resp.send("<a href='/books'>books</a>");
        });
        app.get("/books", (req, resp) => {
            book_1.default.find((err, books) => {
                if (err) {
                    resp.status(500).send(err);
                }
                else {
                    resp.send(books);
                }
            });
        });
        app.post("/books", (req, resp) => {
            let book = new book_1.default(req.body);
            book.save(err => {
                if (err) {
                    resp.status(500).send(err);
                }
                else {
                    resp.send(book);
                }
            });
            console.log("post received");
        });
        app.get("/books/:id", (req, resp) => {
            let id = req.params.id;
            book_1.default.findById(id, (err, book) => {
                if (err) {
                    resp.status(500).send(err);
                }
                else {
                    resp.send(book);
                }
            });
        });
        app.patch("/books/:id", (req, resp) => {
            let id = req.params.id;
            let oldBook = req.body;
            book_1.default.findByIdAndUpdate(id, oldBook, (err, result) => {
                if (err) {
                    resp.status(500).send();
                }
                else {
                    resp.send("updated successfully");
                    console.log(result);
                }
            });
        });
        app.delete("/books/:id", (req, resp) => {
            let id = req.params.id;
            book_1.default.findByIdAndDelete(id, (err, result) => {
                if (err) {
                    resp.status(500).send();
                }
                else {
                    resp.send("deleted successfully");
                    console.log(result);
                }
            });
        });
        app.get("/books-search", (req, resp) => {
            let p = parseInt(req.query.page || 1);
            let size = parseInt(req.query.size || 5);
            let keyword = req.query.keyword || "";
            book_1.default.paginate({ title: { $regex: ".*(?i)" + keyword + ".*" } }, { page: p, limit: size }, (err, result) => {
                if (err) {
                    resp.status(500).send(err);
                }
                else {
                    resp.send(result);
                }
            });
        });
        app.listen(this.port, () => {
            console.log("the server started");
        });
    }
}
exports.default = Server;
