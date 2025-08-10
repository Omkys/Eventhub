const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: Number, required: true },
  location: { type: String, required: true },
  category: { type: String, enum: ['Academic', 'Cultural', 'Sports', 'Technical', 'Workshop', 'Seminar'], default: 'Academic' },
  maxParticipants: { type: Number, default: 100 },
  image: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interestedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);