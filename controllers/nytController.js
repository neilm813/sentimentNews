require('dotenv').load();
var axios = require('axios');
var sentiment = require('../controllers/sentiment');

var sentObj =
	{
		"documents": [
			{
				"language": "en",
				"id": "1",
				"text": ""
			}
		]
	};

function getArticles(year, month) {
  (function callNYT(req, res) {
    var key = process.env.NYT_KEY;
    console.log(`nyt key: ${key}`);

    axios.get(`https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${key}`)
      .then(function (response) {

        sentObj.documents[0].text = returnSentimentText(response.data.response.docs);

        sentiment.msSentiment(sentObj);

        // Call to old sentiment API
        // sentiment.getSentiment(returnSentimentText(response.data.response.docs));
      })
      .catch(function (error) {
        console.log(error);
        console.log('ERROR!');
      })
  })();
}
// getArticles('2017', '1');

function returnSentimentText(articles) {
  var sentimentText = '';

  for (var i = 0; i < articles.length; i++) {
    sentimentText += (articles[i].headline.main + '. ');
  }
  return sentimentText;
}


module.exports = {
  getArticles: getArticles
}


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