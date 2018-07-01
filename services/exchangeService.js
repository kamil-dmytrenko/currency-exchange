const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const db = require('../models');

exports.getCurrencyInfo = (currencyCode) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `http://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}/?format=json`);
      xhr.onload = function() {
        if (this.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(this.status);
        }
      };
      xhr.send();
    })
  };

exports.saveToDb = (req, res, newExchange) => {
  db.Exchange.create(newExchange)
    .then(newExchange => res.status(201).json(newExchange.amountAfterConversion))
    .catch(err => res.send(err))
};

module.exports = exports;



