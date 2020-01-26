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
            resp.send("<h1>Hellllo</h1>");
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
        app.listen(this.port, () => {
            console.log("the server started");
        });
    }
}
exports.default = Server;
