const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const next = require("next");
const Db_conncection = require("./Helper/initDB");
var cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    // database connection
    Db_conncection();

    // session store 
    let store = new MongoDBStore({
      uri: process.env.MONGO_URI,
      collection: 'sessions'
    });

    // session configured
    server.use(session({
      secret: process.env.SECRET_KEY,
      resave:false,
      saveUninitialized:false,
      store:store
    }))


    // bodyparser and cookie parser
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json())
    server.use(cookieParser());
    // public path
    server.use(express.static(path.join(__dirname, '../public')));

    // router pathes
    const userRoutes = require("./route/User");
    const productRoutes = require("./route/Product");
    const blogRoutes = require('./route/Blog');
    const cartRoutes = require('./route/Cart');
    const buyerRoutes = require('./route/BuyerProduct');
    // Api path
    server.use("/api/user", userRoutes);
    server.use("/api/product", productRoutes);
    server.use("/api/blog", blogRoutes);
    server.use("/api/cart", cartRoutes);
    server.use("/api/buy", buyerRoutes);


    if (process.env.NODE_ENV == 'production') {
      app = next('production');
      app.use(express.static(__dirname, '../.next'))
    }


    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`server running on ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
