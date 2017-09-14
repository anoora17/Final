    var express     = require('express');
    var passport    = require('passport');
    var session     = require('express-session');
    var bodyParser  = require('body-parser');
    var env         = require('dotenv').load();
    var exphbs      = require('express-handlebars');
    var path        = require('path');
    var cookieParser=require('cookie-parser');
    var expressValidator= require('express-validator');
    var flash      = require('connect-flash');
    var LocalStrategy = require('passport-local').Strategy;
    var SequelizeStore = require('connect-session-sequelize')(session.Store); // to store sessstion


    var PORT = process.env.PORT || 5000;

    //APP INIT
    var app  = express();


    //Models
    var db = require("./app/models");
   // routes
    var routes   = require('./app/routes/main.js');
    var customer = require('./app/routes/customer') // to get the routs for customer module
    var admin    = require('./app/routes/admin')

     // Sets up the Express app to handle data parsing
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.text());
      app.use(bodyParser.json({ type: "application/vnd.api+json" }));

      
               //For Handlebars
      app.set('views', 'views')
      app.engine('hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
      app.set('view engine', '.hbs');
    var mystor = new SequelizeStore({  db: db.sequelize });
   // changed to false for csrf https://www.npmjs.com/package/express-mysql-session
    app.use(cookieParser("_secret_"));
    app.use(session({
      key: 'customer_id', 
      secret: 'cupcake',
         store: mystor,
       resave: false,
       saveUninitialized:false,
       // cookie:{
       //    httpOnly: false,
       //  maxAge: 60 * 180 * 1000 }
        }));

    // connect Falsh
    app.use(flash());
    // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

// Static directory
  app.use(express.static('./public'));

   //EXPRESS Validator
   app.use(expressValidator({
    errorFormatter: function(param, msg, value){

        var namespace =  param.split('.')
        , root        = namespace.shift()
        , formParam   = root;
      while(namespace.length){
        formParam += '['+namespace.shift() + ']';
      }

    return {
        param: formParam,
        msg  : msg,
        value: value
      }
    }
   }));


    // Global variable for flash

    app.use(function(req, res, next){
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg   = req.flash('error_msg');
        res.locals.error       = req.flash('error');
        res.locals.session     = req.session;
        res.locals.session.myCart= req.myCart; 
        res.locals.login       = req.isAuthenticated();        
        res.locals.products    =req.products;
        res.locals.customer    =req.customer || null ; // to render handlebars curomer 
        next()
    });

    app.use('/', routes);
    app.use('/about', routes);
    app.use('/cart', routes);
    app.use('/products', routes);
    app.use('/customer', customer);
    app.use('/admin', admin);


    //Sync Database // update Jay
    db.sequelize.sync().then(function(){
    console.log('Nice! Database looks fine')

    }).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
    });



	app.listen(PORT, function(err){
    console.log(PORT)
		if(!err)
		console.log("Site is live"); else console.log(err)

	});
