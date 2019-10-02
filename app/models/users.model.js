const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number
});

exports.createUser = userData => {
  const user = new User(userData);
  return user.save();
};

exports.findById = id => {
  return User.findById(id).then(result => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function(err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
};

exports.removeById = userId => {
  return new Promise((resolve, reject) => {
    User.remove({ _id: userId }, err => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
const User = mongoose.model("Users", userSchema);
// module.exports = mongoose.model("User", userSchema);
