const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



/**
 * GET route template
 */
router.get('/', (req, res) => {
  const userId = req.user.id;
  const queryText = 'SELECT * FROM "entry" WHERE data_date >= NOW() - INTERVAL \'1 month\' AND user_id = $1 ORDER BY id DESC';
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

router.delete('/:id', (req, res) => {
    const entryId = req.params.id;
    const userId = req.user.id;
    const queryText = 'DELETE FROM "entry" WHERE id = $1 AND user_id = $2';
    const values = [entryId, userId];
    pool.query(queryText, values)
      .then(() => {
        console.log('Entry deleted successfully');
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error deleting entry', error);
        res.sendStatus(500);
      });
  });

module.exports = router;