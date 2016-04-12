var mongoose = require('mongoose');
var pageSchema = require('./page').schema;
 
module.exports = mongoose.model('Group',{
  name: String,
  pages: [pageSchema]
});