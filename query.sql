CREATE TABLE IF NOT EXISTS ts (
    id SERIAL NOT NULL PRIMARY KEY, 
    data INTEGER[] DEFAULT '{0,0,0,0,0,0,0}', 
    last_date DATE,
    pos INTEGER,
    week_started BOOLEAN Default true,
    week_start BIGINT NOT NULL
);

INSERT INTO ts (pos, last_date, week_start) VALUES (4, '2019-11-06', 1573020678965);