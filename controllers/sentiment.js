var unirest = require('unirest');

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

module.exports = {
  getSentiment
}
