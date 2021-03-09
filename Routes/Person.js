const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

// import schema 
const person = require('../Models/PersonSchema');


// add person
router.post('/addperson', (req,res) =>{
    let addperson = new person(req.body);
    addperson.save((err,data) =>{
        err ? console.log(err) : res.send("person was added..");
    })
})
//create many person using model.create()
const arrayOfPeople = [
              { name: 'anis', age: 30, favoriteFoods: ['Fettuccine Alfredo', 'Sushi', 'Quiche'] },
              { name: 'marwen', age: 22, favoriteFoods: ['Pasta', 'French Fries'] },
              { name: 'anas', age: 41, favoriteFoods: ['Pasta', 'pizza', 'suchi'] },
              { name: 'melek', age: 10, favoriteFoods: ['Pasta', 'fish', 'Quiche'] },
              { name: 'mahdi', age: 36, favoriteFoods: ['Pasta', 'Cheeseburgers', 'French Fries'] }
            ];
     router.post('/addmanyperson',(req,res) =>{
            person.create(arrayOfPeople)
            .then(function (docs) {
                res.json(docs);
            })
            .catch(function (err) {
                res.status(500).send(err);
            });
        })
//Perform Classic Updates by Running Find, Edit, then Save

router.get('/peoples/:id',(req,res) =>{
    person.findById({_id : req.params.id},(err,doc) =>{
      doc.favoriteFoods.push('hamburger');
      doc.save();
      err ? console.error(err) : res.json(doc);
    })
})


// find person
router.get('/', (req,res) =>{
   person.find( {}, (err,data)=>{
        err ? console.log(err) : res.json(data)
   })
})
 // find one person by favorite foods
 router.get('/onePerson', (req,res) =>{
    person.findOne( {favoriteFoods : 'hamburger'}, (err,data)=>{
         err ? console.log(err) : res.json(data)
    })
 })

 // find person by id
 router.get('/findById/:id', (req,res) =>{
    person.findById( {_id : req.params.id}, (err,data)=>{
         err ? console.log(err) : res.json(data)
    })
 })

 // find person and update it 
 router.get('/personToUpdate/:name' , (req,res) =>{
     person.findOneAndUpdate({name :req.params.name},{$set :{age :20}},{new :true}, (err,data)=>{
        err ? console.log(err) : res.json(data);
     })
 })

// delete person by id
router.delete('/deleteperson/:id' , (req,res) =>{
    person.findByIdAndRemove({_id :req.params.id},(err,msg)=>{
       err ? console.log(err) : res.json({msg : "person was deleted !"});
    })
})
// remove person whose name is Mary
router.delete('/deletepersonbyname' , (req,res) =>{
    person.remove({name :'Mary'},(err,msg)=>{
       err ? console.log(err) : res.json({msg : "persons was deleted !"});
    })
})

//Chain Search Query Helpers to Narrow Search Results
router.get('/all' ,(req,res) =>{
   person.find({name :'Meeva'}).limit(10).sort({name: 1})     
    .select({age: false}) 
                     
    .then(docs => {
       res.json(docs);
     })
    .catch(err => {
      res.send({err :'error...'})
     })
})


module.exports =router;

