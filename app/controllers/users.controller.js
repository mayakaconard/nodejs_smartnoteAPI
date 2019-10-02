const userModel = require("../models/users.model.js");
var crypto = require("crypto");

exports.insert = (req, res) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  userModel.createUser(req.body).then(result => {
    res.status(201).send({ id: result._id });
  });
};

exports.getById = (req, res) => {
  userModel.findById(req.params.userId).then(result => {
    res.status(200).send(result);
  });
};

exports.list = (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  userModel.list(limit, page).then(result => {
    res.status(200).send(result);
  });
};

exports.removeById = (req, res) => {
  userModel.removeById(req.params.userId).then(result => {
    res.status(204).send({});
  });
};
