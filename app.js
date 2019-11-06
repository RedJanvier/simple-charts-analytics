const express = require('express');
const moment = require('moment');
const cors = require('cors');
const db = require('./config/database');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('./public'));

app.get('/api', (req, res, next) => {
    const day = new Date();
    const last_date = moment(day).format('YYYY MM DD');
    const position = day.getDay() + 1;
    const now = Date.now();
    db
        .query('SELECT * FROM ts WHERE id = 1')
        .then(datas => {
            let { data, week_started, week_start, pos } = datas.rows[0];

            if (!week_started && pos === position && (now - week_start) >= 604800000) {
                const query = {
                    text: "UPDATE ts SET data[$1] = $3, last_date = $2, pos = $1, week_started = $4, week_start = $5 WHERE id = 1;",
                    values: [position, last_date, 1, true, now]
                };

                return db
                    .query(query)
                    .then(() => {
                        console.log('Week Restarted...');
                        return res.status(200).json({ success: true, msg: 'Week Restarted...' });
                    });
            }

            let count = data[position - 1];
            count++;

            const query = {
                text: "UPDATE ts SET data[$1] = $3, last_date = $2, pos = $1, week_started = $4 WHERE id = 1;",
                values: [position, last_date, position === 7 ? 0 : count, false]
            };

            return db
                .query(query)
                .then(() => {
                    return res.status(200).json({ success: true, count });
                });

        })
        .catch(e => {
            console.error(e.stack);
            res.status(500).json({ success: false });
        });

});

app.get('/api/analytics', (req, res, next) => {
    db
        .query('SELECT data FROM ts WHERE id = 1')
        .then(response => {
            const data = response.rows[0].data;
            return res.status(200).json({ success: true, data });
        })
        .catch(err => {
            console.log(err.stack);
            res.status(500).json({ success: false });
        });
});

module.exports = app;