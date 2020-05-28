const URL =
  `http://localhost:4000/api/` ||
  'https://redjanvier-analytics.herokuapp.com/api/';
fetch(URL)
  .then((res) => res.json())
  .then(console.log)
  .catch(console.log);
