module.exports = app => {
  const notes = require("../controllers/note.controller.js");
  const users = require("./../controllers/users.controller");

  // Create a new Note
  app.post("/notes", notes.create);

  // Retrieve all Notes
  app.get("/notes", notes.findAll);

  // Retrieve a single Note with noteId
  app.get("/notes/:noteId", notes.findOne);

  // Update a Note with noteId
  app.put("/notes/:noteId", notes.update);

  // Delete a Note with noteId
  app.delete("/notes/:noteId", notes.delete);

  // insert user
  app.post("/users", [users.insert]);
  // get a single user
  app.get("/users/:userId", [users.getById]);

  // get all users
  app.get("/users/", [users.list]);

  // delete user
  app.delete("/users/:userId", [users.removeById]);
};
