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
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
