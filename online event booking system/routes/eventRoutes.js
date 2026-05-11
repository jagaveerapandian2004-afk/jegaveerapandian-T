const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
        if(err) throw err;

        res.render('home', { events: results });
    });
});

router.get('/event/:id', (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM events WHERE id=?', [id], (err, results) => {
        if(err) throw err;

        res.render('event-details', { event: results[0] });
    });
});

router.get('/create-event', (req, res) => {
    res.render('organizer-dashboard');
});

router.post('/create-event', (req, res) => {
    const { title, description, date, location, seats } = req.body;

    const organizer_id = req.session.user.id;

    const sql = `INSERT INTO events(title, description, date, location, seats, organizer_id)
                 VALUES(?,?,?,?,?,?)`;

    db.query(sql, [title, description, date, location, seats, organizer_id], (err) => {
        if(err) throw err;

        res.redirect('/');
    });
});

module.exports = router;