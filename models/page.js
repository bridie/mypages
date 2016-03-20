var mongoose = require('mongoose');
 
module.exports = mongoose.model('Page',{
  name: String,
  url: String,
});
