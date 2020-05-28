import cors from 'cors';
import moment from 'moment';
import { config } from 'dotenv';
import express, { json, urlencoded, static as _static } from 'express';

import db from './config/database';

config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/public', _static('./public'));

app.get('/api', (req, res) => {
  const day = new Date();
  const lastDate = moment(day).format('YYYY MM DD');
  const position = day.getDay() + 1;
  const now = Date.now();
  db.query('SELECT * FROM ts WHERE id = 1')
    .then((datas) => {
      const { data, weekStarted, weekStart, pos } = datas.rows[0];

      if (!weekStarted && pos === position && now - weekStart >= 604800000) {
        const query = {
          text:
            'UPDATE ts SET data = $3, last_date = $2, pos = $1, week_started = $4, week_start = $5 WHERE id = 1;',
          values: [position, lastDate, '{0,0,0,1,0,0,0}', true, now],
        };

        return db.query(query).then(() => {
          console.log('Week Restarted...');
          return res
            .status(200)
            .json({ success: true, msg: 'Week Restarted...' });
        });
      }

      let count = data[position - 1];
      count++;

      const query = {
        text:
          'UPDATE ts SET data[$1] = $3, last_date = $2, pos = $1, week_started = $4 WHERE id = 1;',
        values: [position, lastDate, position === 7 ? 0 : count, false],
      };

      return db.query(query).then(() => {
        return res.status(200).json({ success: true, count });
      });
    })
    .catch((e) => {
      console.error(e.stack);
      res.status(500).json({ success: false });
    });
});

app.get('/api/analytics', (req, res) => {
  db.query('SELECT data FROM ts WHERE id = 1')
    .then((response) => {
      const { data } = response.rows[0];
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(500).json({ success: false });
    });
});

app.listen(
  PORT,
  console.log(`Server started at http://localhost:${PORT}/api/`)
);
