const mongoose = require('mongoose')
const Cleaner = require('database-cleaner')
const dbCleaner = new Cleaner('mongodb')
global.dbCleaner = dbCleaner
