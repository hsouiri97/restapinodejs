import mongoose from "mongoose";

export default class DB {
  public static connect(): void {
    const uri =
      "mongodb+srv://root:UvCrp0WWUKPZYa09@cluster0-4mnvg.mongodb.net/library?retryWrites=true&w=majority";

    mongoose
      .connect(uri, {
        useNewUrlParser: true
      })
      .catch(err => {
        console.log("here is the error", err);
      });
  }

  /* const MongoClient = require("mongodb").MongoClient;
    const uri =
      "mongodb+srv://root:UvCrp0WWUKPZYa09@cluster0-4mnvg.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err: any) => {
      if (err) {
        console.log("here is the error: ", err);
      } else {
        const collection = client.db("library").collection("books");
        // perform actions on the collection object
        console.log(collection.countDocuments());

        client.close();
      }
    });
  }*/
}
