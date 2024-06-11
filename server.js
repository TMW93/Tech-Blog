const path = require(`path`);
const express = require(`express`);
const session = require(`express-session`);
const exphbs = require(`express-handlebars`);
const routes = require(`./controllers`);
const helpers = require(`./utils/helpers`);
const sequelize = require("./config/connection");

const SequelizeStore = require(`connect-session-sequelize`)(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({helpers});
// const hbs = exphbs.create({});

const sess = {
  secret: 'Very secret secret',
  resave: false,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    httpOnly: true,
    maxAge: 1800000, //30 minute cookie will refresh on every server hit
    secure: false,
  },
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine(`handlebars`, hbs.engine);
app.set(`view engine`, `handlebars`);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, `public`)));

app.use(routes);

sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log(`Now Listening`));
});