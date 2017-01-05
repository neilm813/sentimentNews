const unirest = require('unirest');
require('dotenv').load();



//Make call to news source api, parse json, set body text to variable text then call getSentiment



var text = process.env.TEXT;


var getSentiment = () => {

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
  getSentiment
}
