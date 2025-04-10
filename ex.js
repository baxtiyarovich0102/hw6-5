import client from '../config/db.js'

let getAnimal = async (req, res, next) => {
 let data = await client.query('select * from animal')
 res.json(data.rows)
}

let getAnimalById = async (req, res, next) => {
 let data = await client.query('select * from animal where id=$1', [
  req.params.id,
 ])
 res.json(data.rows)
}

let postAnimal = async (req, res, next) => {
 let { name, type_id } = req.body

 let data = await client.query(
  'insert into animal(name, type_id) values($1, $2) RETURNING *',
  [name, type_id],
 )
 res.status(201).json({ message: 'created!', data })
}

let postTypes = async(req, res) => {
    let { name } = req.body

 let data = await client.query(
  'insert into animal_types(type_name) values($1) RETURNING *',
  [name],
 )
 res.status(201).json({ message: 'created!', data })
}

let updateAnimal = async(req, res) => {
    let { name } = req.body
    let id = req.params.id
    if(!name) return res.send("Ma'lumot kiritilmagan")
    let data = await client.query(
        'update animal set name=($1) where id=($2) returning *', [name, id]
    )
    res.status(200).json({message: "Updated", data})
}

export default {
 getAnimal,
 getAnimalById,
 postAnimal,
    postTypes,
    updateAnimal
}



