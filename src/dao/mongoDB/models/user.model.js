import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    index: true
  },
  last_name: { type: String, required: true },
  age: { type: Number },
  email:  { type: String, required: true, unique: true },  
  gender:  { type: String, required: true },
  carts: [{
    type: Schema.Types.ObjectId,
    ref: 'carts',
    default: []
  }]
});

UserSchema.pre('find', function () {
  this.populate('carts')
});

export const UserModel = model('users', UserSchema); 