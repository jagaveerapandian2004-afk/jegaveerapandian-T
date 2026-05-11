const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/book/:id', (req, res) => {
    const eventId = req.params.id;

    db.query('SELECT * FROM events WHERE id=?', [eventId], (err, results) => {
        if(err) throw err;

        res.render('booking', { event: results[0] });
    });
});

router.post('/book/:id', (req, res) => {
    const eventId = req.params.id;
    const userId = req.session.user.id;

    db.query('SELECT * FROM events WHERE id=?', [eventId], (err, results) => {

        const event = results[0];

        if(event.seats > 0) {

            const ticketId = 'TICKET' + Date.now();

            const bookingSql = 'INSERT INTO bookings(user_id,event_id,ticket_id) VALUES(?,?,?)';

            db.query(bookingSql, [userId, eventId, ticketId], (err) => {
                if(err) throw err;

                const updateSeats = 'UPDATE events SET seats = seats - 1 WHERE id=?';

                db.query(updateSeats, [eventId], (err) => {
                    if(err) throw err;

                    res.send(`Booking Confirmed. Ticket ID: ${ticketId}`);
                });
            });

        } else {
            res.send('No seats available');
        }
    });
});

module.exports = router;