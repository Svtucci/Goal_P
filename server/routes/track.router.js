const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



/**
 * GET route template
 */
router.get('/', (req, res) => {
  const userId = req.query.userId; // Assuming the user ID is passed as a query parameter
  console.log(userId); 
  const queryText = 'SELECT * FROM "entry" WHERE user_id = $1 AND data_date >= NOW() - INTERVAL \'1 month\'';
  pool.query(queryText, [userId])
    .then((result) => {
      const data = result.rows;
      res.send(data);
    })
    .catch((error) => {
      console.log('Error fetching data from DB', error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req,res) => {
    const currentIntake = req.body.amount;
    const userId = req.body.userId;
    // Shows the userId that will be sent to DB 
    console.log('Received userId', userId);
    const queryText = `INSERT INTO "entry" (user_id, amount, data_date)
      VALUES ($1, $2, NOW()) RETURNING id`;
      pool.query(queryText, [userId, currentIntake]).then((result) => {
        // const insertedId = result.row[0].id;
        console.log('SUCCESSFUL SEND TO DB')
        res.sendStatus(200)
      }).catch((error) => {
        console.log('Error in DB FORM POST', error);
        res.sendStatus(500);
      })
  })

module.exports = router;
