const db = require('../models');
const service = require('../services/exchangeService');

exports.createOne = (req,res) => {
  let newExchange = {
    from: req.params.from,
    amountToConvert: req.params.amount,
    to: req.params.to
  };

  if (req.params.from === "PLN") {
    service.getCurrencyInfo(req.params.to)
      .then((resp) => {
        newExchange.amountAfterConversion = (newExchange.amountToConvert/resp.rates[0].mid).toFixed(2);
        service.saveToDb(req, res, newExchange);
      })
      .catch((err) => res.send(err));
  }
  else if (req.params.to === "PLN") {
    service.getCurrencyInfo(req.params.from)
      .then((resp) => {
        newExchange.amountAfterConversion = (resp.rates[0].mid * newExchange.amountToConvert).toFixed(2);
        service.saveToDb(req, res, newExchange);
      })
      .catch((err) => res.send(err));
  }
  else {
    Promise.all([service.getCurrencyInfo(req.params.from), service.getCurrencyInfo(req.params.to)])
      .then((resp) => {
        newExchange.amountAfterConversion = ((resp[0].rates[0].mid * newExchange.amountToConvert)/resp[1].rates[0].mid).toFixed(2);
        service.saveToDb(req, res, newExchange);
      })
      .catch((err) => res.send(err));
  }

};

exports.getAll = (req, res) => {
  db.Exchange.find()
    .then(exchanges => res.status(200).json(exchanges))
    .catch(err => res.send(err))
};

exports.getOne = (req, res) => {
  /** @namespace req.params.exchangeId */
  db.Exchange.findById(req.params.exchangeId)
    .then(foundExchange => res.json(foundExchange))
    .catch(err => res.send(err))
};

exports.updateOne = (req, res) => {
  db.Exchange.findOneAndUpdate({_id: req.params.exchangeId}, req.body, {new: true})
    .then(exchange => res.json(exchange))
    .catch(err => res.send(err))
};

exports.deleteOne = (req, res) => {
  db.Exchange.remove({_id: req.params.exchangeId})
    .then(() => res.json({message: 'Success!'}))
    .catch(err => res.send(err))
};

module.exports = exports;