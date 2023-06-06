const mongoose = require('mongoose');


async function connecttoMango() {
  await mongoose.connect('mongodb://127.0.0.1:27017/check');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
connecttoMango().catch(err => console.log(err));
module.exports=connecttoMango;