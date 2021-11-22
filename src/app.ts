import express, { Request, Response, Application } from "express";
import {knex, Knex } from "knex";
import { v4 } from "uuid";
require("dotenv").config();

const app: Application = express();

//MySql config
const config = {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "password",
      multipleStatements: true,
    },
  };

const instance: Knex = knex(config as Knex.Config);
instance.seed.run({
  directory: "src/seeds",
});
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response): void => {
  res.send("Server Running");
});

//creating a payment_note and updating transaction and payment_note tables
app.post("/create", async (req: Request, res: Response) => {
  try {
    const id = v4();
    
    await instance("payment_note").insert({
      payment_note_period_from_datetime: req.body.period_from_datetime,
      payment_note_period_to_datetime: req.body.period_to_datetime,
      payment_note_uuid: id,
      payment_note_created_datetime: new Date(),
      payment_note_transactions_count: 0,
      payment_note_value: 0,
      payment_note_status_code: "CREATING",
    });
    //sending success status after successful insertion of a row in payment_note
    res.sendStatus(200);
    // transactions which are inbetween from and to datetimes of payment_note
    const transactions = await instance("transaction")
      .where("transaction_status_code", "=", "PENDING")
      .where("transaction_datetime", ">=", req.body["period_from_datetime"])
      .where("transaction_datetime", "<", req.body["period_to_datetime"]);

     //updating transaction table with payment note id and paid status 
    await instance("transaction")
      .where("transaction_status_code", "=", "PENDING")
      .where("transaction_datetime", ">=", req.body["period_from_datetime"])
      .where("transaction_datetime", "<", req.body["period_to_datetime"])
      .update({
        transaction_payment_note_uuid: id,
        transaction_status_code: "PAID",
      });
      
      //updating payment_note table with status, transactions count and sum of transactions.
    await instance("payment_note")
      .where({ payment_note_uuid: id })
      .update({
        payment_note_transactions_count: transactions.length,
        payment_note_value: transactions.reduce((a, b) => {
          if (b.transaction_value && !isNaN(b.transaction_value)) {
            a = a + b.transaction_value;
          }
          return a;
        }, 0),
        payment_note_status_code: "COMPLETED",
      });
      
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//route to get all payment notes
app.get("/getAllPaymentNotes", async (req: Request, res: Response) => {
  try {
    const data = await instance("payment_note").select();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// route to get a specific payment note with id
app.get(
  "/getTransactionsBasedOnPaymentNote/:id",
  async (req: Request, res: Response) => {
    try {
      const data = await instance("transaction").where({
        transaction_payment_note_uuid: req.params.id,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

app.listen(PORT, (): void => {
  console.log(`Server Running @ https://localhost:${PORT}`);
});