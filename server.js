const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const es6Renderer = require("express-es6-template-engine");
const passport = require("passport");
const multer = require("multer");

const LocalStrategy = require("passport-local").Strategy;
const db = require("./models");
const User = db.user;
const Etudiant = db.etudiant;
const Enseignant = db.enseignant;
const Organisme = db.organisme;
const Stage = db.stage;
const Docs = db.docstage;
const DemandeStage = db.demandestage;

const { QueryTypes } = require("sequelize");
const sequelize = db.sequelize;

const path = require("path");
const app = express();

app.use(express.json({ limit: "50mb" }));

app.engine("html", es6Renderer);
app.set("views", "views");
app.set("view engine", "html");

app.use(
  session({
    secret: "fkelocnqyr6NFO7",
    resave: false,
    saveUninitialized: false,
  })
);
 
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const randomName = Math.random().toString(36).substring(7);
    const originalFilename = file.originalname;
    const sanitizedFilename = originalFilename.replace(/[^\x20-\x7E]/g, ""); // Remove non-ASCII characters
    const fileName = randomName + "_" + sanitizedFilename;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

// Handle file upload
app.post("/api/upload", upload.any(), async (req, res) => {
  try {
    const cv = req.files.find((file) => file.fieldname == "cv");
    const letter = req.files.find((file) => file.fieldname == "letter");
    await DemandeStage.create({
      cv_path: "http://localhost:3000/uploads/" + cv.filename,
      letter_path: "http://localhost:3000/uploads/" + letter.filename,
      etat: "en attente",
      etudiantId: req.body.etudiantId,
      stageId: req.body.stageId,
    });
    res.status(200).json({ message: "Upload successful" });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.post("/stage/docs", upload.any(), async (req, res) => {
  try {
    const cdc = req.files.find((file) => file.fieldname == "cdc");
    const journal = req.files.find((file) => file.fieldname == "journal");
    const rapport = req.files.find((file) => file.fieldname == "rapport");

    const doc = await Docs.findOne({ where: { stageId: req.body.stageId } });
    if (doc) {
      if (cdc) {
        await Docs.update(
          { cdc_path: "http://localhost:3000/uploads/" + cdc.filename },
          { where: { stageId: req.body.stageId } }
        );
      }
      if (journal) {
        await Docs.update(
          { journal_path: "http://localhost:3000/uploads/" + journal.filename },
          { where: { stageId: req.body.stageId } }
        );
      }
      if (rapport) {
        await Docs.update(
          { rapport_path: "http://localhost:3000/uploads/" + rapport.filename },
          { where: { stageId: req.body.stageId } }
        );
      }
    } else {
      await Docs.create({
        stageId: req.body.stageId,
      });
      if (cdc) {
        await Docs.update(
          { cdc_path: "http://localhost:3000/uploads/" + cdc.filename },
          { where: { stageId: req.body.stageId } }
        );
      }
      if (journal) {
        await Docs.update(
          { journal_path: "http://localhost:3000/uploads/" + journal.filename },
          { where: { stageId: req.body.stageId } }
        );
      }
      if (rapport) {
        await Docs.update(
          { rapport_path: "http://localhost:3000/uploads/" + rapport.filename },
          { where: { stageId: req.body.stageId } }
        );
      }
    }
    res.status(200).json({ message: "Upload successful" });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

const createAdmin = async () => {
  const admin = await User.findOne({ where: { cin: 0000 } });
  if (!admin) {
    await User.create({
      cin: "0000",
      nom: "admin",
      prenom: "admin",
      email: "admin@admin.com",
      mot_de_passe: "admin",
      role: "admin",
    });
  }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "cin",
      passwordField: "mot_de_passe",
    },
    async (username, password, done) => {
      // console.log(username,password);

      try {
        // const user = await sequelize.query(
        //   `SELECT * FROM users WHERE cin = ${username}`,
        //   { type: QueryTypes.SELECT }
        // );

        const user = await User.findOne({
          where: { cin: username },
          raw: true,
        });
        if (!user || user.length === 0) {
          return done(null, false, { message: "Incorrect cin." });
        }
        if (user.mot_de_passe !== password) {
          return done(null, false, { message: "Incorrect password." });
        }
        // Assuming that `user` object has an `id` property
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ) 
);

passport.serializeUser((user, done) => {
  //  console.log("serialize user", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ where: { id: id } });
    // console.log("deserialize user", user);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.post("/auth/login", passport.authenticate("local"), (req, res) => {
  res.json({ success: true });
});

app.use(
  "/public",
  express.static("public", {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".css")) {
        res.set("Content-Type", "text/css");
      }
    },
  })
);

// Use sessions for authentication
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Route to display the login page
// app.get('/login', (req, res) => {
//   res.render('login');
// });
require("./routes")(app);

// Route to handle form submission
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // TODO: validate username and password
  const user = await findUserByUsername(username);
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    // Create a session for the user

    // Redirect to a new page
    res.redirect("/dashboard");
  } else {
    // Display an error message
    res.render("login", { error: "Invalid username or password" });
  }
});

// Middleware to protect routes
function requireAuthentication(req, res, next) {
  if (req.session.user) {
    // User is authenticated, continue to the next handler
    next();
  } else {
    // Redirect to the login page
    res.redirect("/login");
  }
}

// Route that requires authentication
app.get("/dashboard", requireAuthentication, (req, res) => {
  res.render("dashboard", { user: req.session.user });
});

db.sequelize.sync({ alter: true });
createAdmin();
// Start the server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
