import express from 'express';
import Room from '../../../models/Services_Center/seller1/Services_Center_Seller1_Book.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Add new room
router.post('/Services_Center_Seller1_Book', async (req, res) => {
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
router.get('/Services_Center_Seller1_Book', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Delete a room
router.delete('/Services_Center_Seller1_Book/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete room' });
  }
});

// Book a room
router.put('/Services_Center_Seller1_Book/:id/book', async (req, res) => {
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
router.get('/Services_Center_Seller1_Book/:id/bookings', async (req, res) => {
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
router.get('/Services_Center_Seller1_Book/booked', async (req, res) => {
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
router.get('/Services_Center_Seller1_Book/booked', async (req, res) => {
  const userId = req.query.userId; // Get userId from query params
  try {
    const bookedRooms = await Room.find({ 'bookings.userId': userId }).populate('bookings');
    res.json(bookedRooms);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



// Update booking status
router.put('/Services_Center_Seller1_Book/:roomId/bookings/:bookingId', async (req, res) => {
  const { roomId, bookingId } = req.params;
  const { bookingStatus } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found." });

    const booking = room.bookings.find(b => b._id.toString() === bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found." });

    booking.status = bookingStatus;
    await room.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post('/Services_Center_Seller1_Book/:id/comment', async (req, res) => {
  const { text } = req.body;

  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { text } } },
      { new: true }
    );
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

// routes/rooms.js
router.put('/Services_Center_Seller1_Book/:id/like', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to like room' });
  }
});

export default router;
