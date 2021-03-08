//require mongoose
const mongoose = require('mongoose');
// require validator
const validator = require('validator');
// create schema 
const Schema = mongoose.Schema;
const personSchema = new Schema ({
  name :{
      type :String,
      required :true,  // name required 
      validate :(value) =>{             // confirm that the same type of data is passed
        return validator.isAlpha(value);
      }
  },
     age :Number,
    favoriteFoods :[String],
})
// export schema
module.exports = mongoose.model('person',personSchema);
