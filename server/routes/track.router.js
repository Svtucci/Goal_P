const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


/**
 * GET route template
 */
router.get('/', (req, res) => {
  const userId = req.user.id;
  const queryText = 'SELECT * FROM "entry" WHERE user_id = $1 ORDER BY data_date DESC LIMIT 1';
  const values = [userId];
  pool.query(queryText, values)
    .then((result) => {
      const data = result.rows[0]; // Retrieve the first row of data (most recent entry)
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

/**
 * PUT route template
 */
  router.put('/', (req, res) => {
    const { goal, userId } = req.body;
    const queryText = 'UPDATE "user" SET daily_goal = $1 WHERE id = $2';
    const values = [goal, userId];
    pool.query(queryText, values)
      .then(() => {
        // queryText = 'SELECT * FROM "user" WHERE id = $1;'
       
        console.log('Goal updated successfully');
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error updating goal', error);
        res.sendStatus(500);
      });
  });
  
  // router.delete('/:id', (req, res) => {
  //   const entryId = req.params.id;
  //   const userId = req.user.id;
  //   const queryText = 'DELETE FROM "entry" WHERE id = $1 AND user_id = $2';
  //   const values = [entryId, userId];
  //   pool.query(queryText, values)
  //     .then(() => {
  //       console.log('Entry deleted successfully');
  //       res.sendStatus(200);
  //     })
  //     .catch((error) => {
  //       console.log('Error deleting entry', error);
  //       res.sendStatus(500);
  //     });
  // });

module.exports = router;
