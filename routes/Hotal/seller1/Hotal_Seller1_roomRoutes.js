import express from 'express';
import Room from '../../../models/Hotal/seller1/Room.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Add new room
router.post('/rooms', async (req, res) => {
  const { title, description, price, image, roomNumber } = req.body;
  const newRoom = new Room({ title, description, price, image, roomNumber });

  try {
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add room' });
  }
});

// Get all rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Delete a room
router.delete('/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete room' });
  }
});

// Book a room
router.put('/rooms/:id/book', async (req, res) => {
  const { name, contact, members, checkIn, checkOut } = req.body;
  const userId = req.body.userId; // Ensure userId is sent in the request body

  const newBooking = { bookingId: uuidv4(), name, contact, members, checkIn, checkOut, userId, status: 'Pending' };

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $push: { bookings: newBooking } },
      { new: true }
    );
    if (!updatedRoom) return res.status(404).json({ error: 'Room not found' });
    res.json({ roomId: updatedRoom.roomId, title: updatedRoom.title, newBooking });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update room bookings' });
  }
});

// Get room details with bookings
router.get('/rooms/:id/bookings', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json({ roomId: room.roomId, title: room.title, image: room.image, bookings: room.bookings });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get all booked rooms
// Get all booked rooms for a specific user
router.get('/rooms/booked', async (req, res) => {
  const userId = req.query.userId; // Get userId from query params
  try {
    const bookedRooms = await Room.find({ 'bookings.userId': userId }).populate('bookings');
    res.json(bookedRooms);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


// Get all booked rooms for a specific user
router.get('/rooms/booked', async (req, res) => {
  const userId = req.query.userId; // Get userId from query params
  try {
    const bookedRooms = await Room.find({ 'bookings.userId': userId }).populate('bookings');
    res.json(bookedRooms);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



// Update the status of a specific booking in a room
router.put('/rooms/:roomId/bookings/:bookingId', async (req, res) => {
  const { roomId, bookingId } = req.params;
  const { bookingStatus } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const booking = room.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    booking.status = bookingStatus;
    await room.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
