fetch('http://localhost:3000/api/')
    .then(res => res.json())
    .then(console.log)
    .catch(console.log);