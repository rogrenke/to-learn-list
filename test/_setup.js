const app = require('../app');
const mongoose = require('mongoose')
const Cleaner = require('database-cleaner')
const dbCleaner = new Cleaner('mongodb')
global.dbCleaner = dbCleaner
const User = mongoose.model('User');
const List = mongoose.model('List');
const Item = mongoose.model('Item');

console.log( '--------SETUP TIME--------')

mongoose.connect('mongodb://127.0.0.1/to-learn-list_test', {useMongoClient: true}, async () => {
  await mongoose.connection.db.dropDatabase()
  await console.log('--------PARTY TIME--------')
})


//TODO DROP EVERYTHING / - if next CREATE A USER / CREATE A LIST / CREATE AN ITEM / REMOVE EVERYTHING AGAIN / DONE
