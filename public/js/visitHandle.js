fetch('https://redjanvier-analytics.herokuapp.com/api/')
    .then(res => res.json())
    .then(console.log)
    .catch(console.log);