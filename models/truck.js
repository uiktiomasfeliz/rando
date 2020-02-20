const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const truckSchema = new Schema({
  id: { type: 'String', required: true },
  title: { type: 'String', required: true },
  description: { type: 'String', required: true },
  status: { type: 'Number', required: true },
});
/*
truckSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
      delete ret.__v;
      // ret.id = ret._id.toString();
      delete ret._id;
  },
})
*/
module.exports = mongoose.model('Truck', truckSchema);
