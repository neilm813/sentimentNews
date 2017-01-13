require('dotenv').load();
var unirest = require('unirest');
var axios = require('axios');

var text = text;

var getSentiment = (text) => {
	unirest.post("https://twinword-sentiment-analysis.p.mashape.com/analyze/")
		.header("X-Mashape-Key", "XWwI1lRtyEmsh1g9SDGRVs5BlBChp1LZoHCjsnjuhLqJTLgvws")
		.header("Content-Type", "application/x-www-form-urlencoded")
		.header("Accept", "application/json")
		.send(`text=${text}`)
		.end((result) => {
			console.log(result.body);

		});
}

var msSentiment = (obj, req, res) => {
	var apikey = process.env.SENTIMENT;
	console.log(apikey);
	var config = {
		headers: {
			'Ocp-Apim-Subscription-Key': apikey,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	}
	axios.post('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment', obj, config)
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		})
}

/*msSentiment(
	{
		"documents": [
			{
			"language": "en",
			"id": "1",
			"text": "This is effin awesome!"
			}
		]
	}
)*/

// MS Sentiment POST object template

module.exports = {
	getSentiment,
	msSentiment
}
