import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bookingId: { type: String, default: uuidv4 },
  name: String,
  contact: String,
  members: Number,
  checkIn: Date,
  checkOut: Date,
  status: { type: String, default: 'Pending' },
});

const roomSchema = new mongoose.Schema({
  roomId: { type: String, default: uuidv4 },
  title: String,
  description: String,
  price: Number,
  image: String,
  roomNumber: String,
  bookings: [bookingSchema],
  comments: [{ text: String, date: { type: Date, default: Date.now } }],
  likes: { type: Number, default: 0 }, // Add likes field here
});

const Room = mongoose.model('Services_Center_Seller1_Book', roomSchema);

export default Room;
