const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const userId = req.user.id;
    const queryText = 'SELECT * FROM "user" WHERE id = $1;';
    const values = [userId];
    pool.query(queryText, values)
      .then((result) => {
        const data = result.rows;
        res.send(data);
      })
      .catch((error) => {
        console.log('Error fetching data from DB', error);
        res.sendStatus(500);
      });
  });

module.exports = router;