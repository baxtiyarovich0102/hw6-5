import { Router } from "express";
import client from "../config/db.js";

let router = Router();

router.get("/", async (req, res, next) => {
  let data = await client.query("select * from animals");
  res.json(data.rows);
});
router.get("/:id", async (req, res, next) => {
  let data = await client.query("select * from animals where id=$1", [
    req.params.id,
  ]);
  //   let data = await client.query(
  //     `select * from animal where id=${req.params.id}`
  //   );
  res.json(data.rows);
});
router.post("/", async (req, res, next) => {
  let { name } = req.body;

  let data = await client.query(
    "insert into animals(name) values($1) RETURNING *",
    [name]
  );
  res.status(201).json({ message: "created!", data });
});
export default router;
