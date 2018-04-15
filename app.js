const express           = require('express'),
      bodyParser        = require('body-parser'),
      methodOverride    = require('method-override'),
      LocalStrategy     = require('passport-local'),
      cookieParser      = require('cookie-parser'),
      passport          = require('passport'),
      mongoose          = require('mongoose'),
      flash             = require('connect-flash'),
      User              = require('./models/user.js'),
      app               = express(),
      path              = require('path'),
      port              = process.env.PORT || 3000;


/* ======= ROUTE SETUP ============*/
const indexRoute = require('./routes/index.js');

/* ======= DATABASE SETUP ============*/
mongoose.Promise = global.Promise;

const databaseUri = 'mongodb://kenny:kenny@ds149974.mlab.com:49974/not-instagram';

mongoose.connect(databaseUri)
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));

/* ======= MIDDLEWARE SETUP ============*/      
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

/* ======= PASSPORT SETUP ============*/
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(require("express-session")({
      secret: "This is not instagram",
      resave: false,
      saveUninitialized: false
}));

app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

app.use("/", indexRoute);

app.listen(port, (req, res) => console.log(`Server started on port ${port}...`));