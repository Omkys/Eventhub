const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student'], required: true },
  department: { type: String, required: function() { return this.role === 'student'; } },
  year: { type: Number, required: function() { return this.role === 'student'; } },
  phone: String,
  bio: String,
  avatar: String,
  preferences: {
    categories: [String],
    departments: [String],
    emailNotifications: { type: Boolean, default: true }
  },
  refreshToken: String
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);