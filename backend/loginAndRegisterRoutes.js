const mongoose = require("mongoose");

const User = require("./models/UserModel");

module.exports = function loginAndRegisterLogic(app) {
  app.post("/api/register", async (req, res) => {
    // Do not allow user to register if already logged in
    if (req.session.user) {
      res.json({ _error: "Logged in! Log out before you register!" });
      return;
    }
    // create a new user using the mongoose model
    let user = new User({ ...req.body, userRole: "user" });
    // try to save the user in db and pick up errors if this fails
    let _error = null;
    await user.save().catch((e) => (_error = e + ""));
    // remove password (only here not in db)
    delete user.password;
    // send user info or error if error
    res.json(_error ? { _error } : user);
  });

  app.post("/api/login", async (req, res) => {
    // Do not allow user to log in if already logged in
    if (req.session.user) {
      res.json({ _error: "Already logged in! Log out first!" });
      return;
    }
    // let the user login
    let { email, password } = req.body;
    let user = await User.findOne({ email, password }).lean();
    // did not find a matching user in db
    if (!user) {
      res.json({ _error: "No such user!" });
      return;
    }
    delete user.password; // don't remember password
    // log in the user, store the user in session
    req.session.user = user;
    // send a response with the user info'
    res.json(user);
  });

  app.get("/api/login", (req, res) => {
    // check if the user is logged in, send back user data if so
    res.json(req.session.user || { _error: "Not logged in" });
  });

  app.delete("/api/login", (req, res) => {
    // let the user logout
    if (req.session.user) {
      delete req.session.user;
      res.json({ _success: "User successfully logged out!" });
    } else {
      res.json({ _error: "No user was logged in, so could not log out!" });
    }
  });
};
