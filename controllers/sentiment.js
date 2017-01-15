require('dotenv').load();
var unirest = require('unirest');
var axios = require('axios');
var sentimentMonth = null;

// object constructor containing text to be analzyed 
function SentimentDoc(id, text) {
	this.language = "en";
	this.id = id;
	this.text = text;
}

/* Final object to be posted to MS Cognitive Services containing all SentimentDocs to be analyzed */
function SentimentPOST(docs) {
	this.documents = docs;
}

function setSentimentMonth (month) {
	sentimentMonth = month;
}

// Entity to post to db
function MonthsAvgSentiment(avgSentiment) {
	this.Month = sentimentMonth;
	this.AvgSentiment = avgSentiment;
}

// Calculate average sentiment for the month from sentiment response
function returnMonthsAvgSentiment(sentiments) {
	var total = null;
	for (var i = 0; i < sentiments.length; i++) {
		total += sentiments[i].score;
	}
	console.log(new MonthsAvgSentiment((total / sentiments.length).toFixed(2)));
}

/* MS Text Analytics Sentiment API - limit text.length to 5095 */
var msSentiment = (obj, req, res) => {
	var apikey = process.env.SENTIMENT;

	var config = {
		headers: {
			'Ocp-Apim-Subscription-Key': apikey,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	}
	axios.post('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment', obj, config)
		.then(function (response) {
			console.log('cognitive services success');
			returnMonthsAvgSentiment(response.data.documents);
		})
		.catch(function (error) {
			console.log(error);
		})
}

/* Compiles formatted object to be used to POST to MS Sentiment Analysis. */
function returnSentimentPostObj(headlines) {
	var arr = [];

	// If array is returned, need to turn each arr element into a sentiment doc:
	if (Array.isArray(headlines) === true && headlines.length <= 1000) {
		for (var i = 0; i < headlines.length; i++) {
			arr.push(new SentimentDoc(i, headlines[i]));
		}
		msSentiment(new SentimentPOST(arr));
	}

	// If all headlines were concated to a single string (only happens if < ~90 articles):
	else if (Array.isArray(headlines) === false) {
		console.log('single sentiment doc only: ');
		arr.push(new SentimentDoc(i, headlines));
		msSentiment(new SentimentPOST(arr));
	}

	// if concated headlines arr.length > 1000
	else {
		/* This shouldn't happen. Full month of NYT articles ~5.5k. converts to ~56 concated headlines */
		console.log('multiple POSTS to MS sentiment API needed');
	}
}

/*msSentiment(
	{
		"documents": [
			new SentimentDoc(0, 'text to analyze.')
		]
	}
)*/

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

module.exports = {
	getSentiment,
	msSentiment,
	returnSentimentPostObj,
	setSentimentMonth
}
