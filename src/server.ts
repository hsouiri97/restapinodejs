import express, { request } from "express";
import { Request, Response } from "express";
import Db from "./db";
import Book from "../model/book";
import bodyParser from "body-parser";
export default class Server {
  constructor(private port: number) {
    Db.connect();
  }

  public start(): void {
    const app = express();

    app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );

    app.use(bodyParser.json());

    app.get("/", (req: Request, resp: Response) => {
      resp.send("<a href='/books'>books</a>");
    });

    app.get("/books", (req: Request, resp: Response) => {
      Book.find((err, books) => {
        if (err) {
          resp.status(500).send(err);
        } else {
          resp.send(books);
        }
      });
    });

    app.post("/books", (req: Request, resp: Response) => {
      let book = new Book(req.body);
      book.save(err => {
        if (err) {
          resp.status(500).send(err);
        } else {
          resp.send(book);
        }
      });
      console.log("post received");
    });

    app.get("/books/:id", (req: Request, resp: Response) => {
      let id = req.params.id;
      Book.findById(id, (err, book) => {
        if (err) {
          resp.status(500).send(err);
        } else {
          resp.send(book);
        }
      });
    });

    app.patch("/books/:id", (req: Request, resp: Response) => {
      let id = req.params.id;
      let oldBook = req.body;
      Book.findByIdAndUpdate(id, oldBook, (err, result) => {
        if (err) {
          resp.status(500).send();
        } else {
          resp.send("updated successfully");
          console.log(result);
        }
      });
    });

    app.delete("/books/:id", (req: Request, resp: Response) => {
      let id = req.params.id;
      Book.findByIdAndDelete(id, (err, result) => {
        if (err) {
          resp.status(500).send();
        } else {
          resp.send("deleted successfully");
          console.log(result);
        }
      });
    });

    app.get("/books-search", (req: Request, resp: Response) => {
      let p: number = parseInt(req.query.page || 1);
      let size: number = parseInt(req.query.size || 5);
      let keyword: string = req.query.keyword || "";
      Book.paginate(
        { title: { $regex: ".*(?i)" + keyword + ".*" } },
        { page: p, limit: size },
        (err, result) => {
          if (err) {
            resp.status(500).send(err);
          } else {
            resp.send(result);
          }
        }
      );
    });

    app.listen(this.port, () => {
      console.log("the server started");
    });
  }
}
