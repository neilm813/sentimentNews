var axios = require('axios');

function index(req, res) {
  var key = process.env.NYT_KEY

  axios.get(`https://api.nytimes.com/svc/archive/v1/2017/1.json?api-key=${key}`)
    .then(function (response) {
      res.json(response.data.response.docs);
    })
    .catch(function (error) {
      console.log(error);
      console.log('ERROR');
      res.json(error);
    })
}

module.exports = {
  index: index
}