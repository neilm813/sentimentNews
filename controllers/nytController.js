var axios = require('axios');

function index(req, res) {
  var key = process.env.NYT_KEY

  axios.get(`https://api.nytimes.com/svc/archive/v1/2016/12.json?api-key=${key}`)
    .then(function (response) {
      res.json(response.data);
      // console.log(response.data);
    })
    .catch(function (error) {
      console.log('error');
      console.log(error);
      res.json(error);
    })
}

module.exports = {
  index: index
}