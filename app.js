var express 		= require('express'),
	app 			= express(),
	bodyParser 		= require('body-parser'),
	mongoose 		= require('mongoose'),
	passport		= require('passport'),
	LocalStrategy 	= require('passport-local'),
	methodOverride  = require('method-override'),
	flash			= require('connect-flash'),
	Dig  			= require('./models/dig'),
	Comment     	= require('./models/comment'),
	User			= require('./models/user'),
	seedDB			= require('./seeds');

var commentRoutes 	 = require('./routes/comments'),
	digRoutes 		 = require('./routes/digs'),
	indexRoutes      = require('./routes/index')



mongoose.connect(process.env.DATABASEURL);


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB();

//PASSPORT CONFIG
app.use(require('express-session')({
	secret: 'you need a job',
	resave: false,
	saveUninitialized: false
}));




app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   
   res.locals.nope = req.flash('nope');
   res.locals.success = req.flash('success');
   next();
   
});


app.use(indexRoutes);
app.use('/digs', digRoutes);
app.use('/digs/:id/comments', commentRoutes);
 


app.listen(process.env.PORT || 3000, function(){
 console.log('xchange was runnin, cuz');
});











