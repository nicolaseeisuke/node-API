const router = require('express').Router()
const Person = require('../models/Person')

// create - criação de dados
router.post('/', async(req,res) => {
  const {name, salary, approved} = req.body

  if(!name){
    res.status(422).json({error: "O nome é obrigatório"})
    return  
  }

  const person = {
    name, 
    salary, 
    approved,
  }

  // create

  try{

    await Person.create(person);

    res.status(201).json({message: "Pessoa inserida com sucesso"})

  }catch(error){
    res.status(500).json({error: error})
  }

})

//read - leitura de dados

router.get('/', async(req, res) => {
 
  try{

    const people = await Person.find()

    res.status(200).json(people )

  }catch(error){      

    res.status(500).json({error: error})

  }
})

router.get('/:id', async(req,res) => {

  // extrair dados da requisição pela URL = req.params
  const id = req.params.id
  
  try{

    const person = await Person.findOne({_id: id})

    if(!person){
      res.status(422).json({message: "O usúario não foi encontrado"})
      return
    }

    res.status(200).json(person)

  }catch(error){

    res.status(500).json({error: error})

  }
})

// Update - ataulizção de dados (PUT ou PATCH)
router.patch('/:id', async(req,res) => {

  const id = req.params.id

  const {name, salary, approved} = req.body

  const person = {
    name, 
    salary, 
    approved
  }

  try{

    const updatePeson = await Person.updateOne({_id: id}, person)

    if(updatePeson.matchedCount === 0){
      res.status(422).json({message: "O usuário não foi encontrado"})
      return
    }

    res.status(200).json(person)

  }catch(error){
    res.status(500).json({error: error})
  }
})

// Delete - deletar dados;
router.delete('/:id', async(req,res) => {

  const id = req.params.id

  const person = await Person.findOne({_id:id})

  if(!person){
    res.status(422).json({message: "Usuário não encontrado"})
    return
  }

  try {

    await Person.deleteOne({_id: id})

    res.status(200).json({message: "Usuário removido com sucesso"})
    
  } catch (error) {
    res.status(422).json({error: error})
  }

})

module.exports = router