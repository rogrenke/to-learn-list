const Cleaner = require('database-cleaner');
const dbCleaner = new Cleaner('mongodb');
global.dbCleaner = dbCleaner;
