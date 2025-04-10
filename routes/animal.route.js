import { Router } from "express";
import client from "../config/db.js";

let router = Router();

router.get("/", async (req, res, next) => {
  let data = await client.query("select * from animals ORDER BY id ");
  res.json(data.rows);
});

router.get("/:id", async (req, res, next) => {
  try {
    let data = await client.query("SELECT * FROM animals WHERE id = $1", [
      req.params.id,
    ]);

    if (data.rows.length === 0) {
      return res.status(404).json({ message: "Animal not found!" });
    }

    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/post", async (req, res, next) => {
  let { name } = req.body;

  let data = await client.query(
    "insert into animals(name) values($1) RETURNING *",
    [name]
  );
  res.status(201).json({ message: "created!", data: data.rows[0] });
});

router.put("/:id", async (req, res)=>{
  let {name} = req.body;
  let {id} = req.params
let data = await client.query(
  "UPDATE animals set name = $1 WHERE id = $2 RETURNING *",
  [name, id]
);
res.status(200).json({ message: "Updated!", data: data.rows[0] });
})

router.delete("/:id", async(req, res)=>{
  let {id} = req.params
let data = await client.query(
  "DELETE from animals WHERE id = $1 RETURNING *",
  [id]
);
res.status(200).json({ message: "Deleted!", data: data.rows[0] });
})

router.post("/types",async(req, res) => {
  let { name } = req.body

let data = await client.query(
  'insert into animal_types(type_name) values($1) RETURNING *',
  [name],
)
res.status(201).json({ message: 'created!', data })
})


router.get("/types",async(req, res) => {
  let data = await client.query(
      'select a.id as id, a.name as name, t.type_name as type from animals a inner join animal_types t on a.type_id = t.id'
  )
  data = data.rows

      
  res.status(200).json({message: "Success", data})

})


export default router;