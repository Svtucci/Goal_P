const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
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
