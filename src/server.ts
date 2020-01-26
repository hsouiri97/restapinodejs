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
      resp.send("<h1>Hellllo</h1>");
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

    app.listen(this.port, () => {
      console.log("the server started");
    });
  }
}
