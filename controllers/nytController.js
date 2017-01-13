var axios = require('axios');
var sentiment = require('../controllers/sentiment');
require('dotenv').load();

/*function index(req, res) {
  var key = process.env.NYT_KEY;
  console.log(key);

  axios.get(`https://api.nytimes.com/svc/archive/v1/2017/1.json?api-key=${key}`)
    .then(function (response) {
      // res.json(response.data.response.docs);
      sentiment.getSentiment(returnSentimentText(response.data.response.docs));
    })
    .catch(function (error) {
      console.log(error);
      console.log('ERROR!');
      // res.json(error);
    })
}*/

function getArticles(year, month) {
  (function callNYT(req, res) {
    var key = process.env.NYT_KEY;
    console.log(`nyt key: ${key}`);

    axios.get(`https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${key}`)
      .then(function (response) {
        // res.json(response.data.response.docs);
        console.log(response.data.response.docs);
        sentiment.getSentiment(returnSentimentText(response.data.response.docs));
      })
      .catch(function (error) {
        console.log(error);
        console.log('ERROR!');
        // res.json(error);
      })
  })();
}

function returnSentimentText(articles) {
  var sentimentText = '';

  for (var i = 0; i < articles.length; i++) {
    sentimentText += (articles[i].headline.main + '. ');
  }
  return sentimentText;
}

getArticles('2017', '1');

module.exports = {
  getArticles: getArticles
}