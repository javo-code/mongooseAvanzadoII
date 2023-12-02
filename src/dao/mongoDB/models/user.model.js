import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    index: true
  },
  last_name: { type: String, required: true },
  age: { type: Number },
  email:  { type: String, required: true, },  
  gender:  { type: String, required: true },
  products:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      default: []
    }
  ]
});


UserSchema.pre('find', function(){
  this.populate('products')
})

export const UserModel = mongoose.model('users', UserSchema); 