const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)';

    db.query(sql, [name, email, hashedPassword, role], (err) => {
        if(err) throw err;
        res.redirect('/login');
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email=?';

    db.query(sql, [email], async (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            const user = result[0];

            const match = await bcrypt.compare(password, user.password);

            if(match) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.send('Invalid Password');
            }
        } else {
            res.send('User not found');
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;