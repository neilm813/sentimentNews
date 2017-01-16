require('dotenv').load();
var axios = require('axios');
var sentiment = require('../controllers/sentiment');

function getArticles(year, month) {
  sentiment.setSentimentMonth(month);

  (function callNYT(req, res) {
    var key = process.env.NYT_KEY;

    axios.get(`https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${key}`)
      .then(function (response) {
        var headlines = returnConcatedHeadlines(response.data.response.docs);
        
        if (Array.isArray(headlines) === true) {
          console.log(`${response.data.response.docs.length} articles' headlines concatenated into ${headlines.length} blocks of text`);
        }

        sentiment.returnSentimentPostObj(headlines);
        
      })
      .catch(function (error) {
        console.log(error);
        console.log('ERROR!');
      })
  })();
}
// getArticles('2016', '5');

/* Concat headlines to reduce # of documents sent in sentiment POST request because of their limit on us & their individual document size limit */
function returnConcatedHeadlines(articles) {
  var concated = '';
  var arr = [];

  for (var i = 0; i < articles.length; i++) {
    // size limit
    if ((concated.length + articles[i].headline.main.length + 2) < 5095) {
      concated += (' ' + articles[i].headline.main + '.');
    }
    else {
      arr.push(concated);
      concated = '';
    }
  }

  if (arr.length === 0) {
    return concated;
  }
  else {
    return arr;
  }
}

module.exports = {
  getArticles
}
