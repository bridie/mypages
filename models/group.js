var mongoose = require('mongoose');
 
module.exports = mongoose.model('Group',{
  name: String,
  pages: [{ type: Schema.Types.ObjectId, ref: 'Page' }]
});