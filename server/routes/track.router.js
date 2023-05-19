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
    const queryText = `INSERT INTO "entry" (amount)
      VALUES ($1) RETURNING id`;
      pool.query(queryText, [currentIntake]).then((result) => {
        // const insertedId = result.row[0].id;
        console.log('SUCCESSFUL SEND TO DB')
        res.sendStatus(200)
      }).catch((error) => {
        console.log('Error in DB FORM POST', error);
        res.sendStatus(500);
      })
  } )

module.exports = router;
