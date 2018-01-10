var express = require("express")
var Sequelize = require("sequelize")
var nodeadmin = require("nodeadmin")

//connect to mysql database
var sequelize = new Sequelize('studydb', 'root', '', {
    dialect:'mysql',
    host:'localhost',
    operatorAliases: false,
    define: {
    freezeTableName: true,
    timestamps: false
  }
    
})

sequelize.authenticate().then(function(){
    console.log('Success');
})
.catch(function(){
    console.log("bad");
});


//resources model
var Resources = sequelize.define('RESOURCES' ,{
    name : Sequelize.STRING,
    path : Sequelize.STRING,
    details : Sequelize.STRING,
    userid :  Sequelize.INTEGER,
    groupid : Sequelize.INTEGER
})


//categories model

var Categories = sequelize.define('CATEGORIES', {
     name : Sequelize.STRING,
     details : Sequelize.STRING
})

//learnpaths model
var Learnpaths = sequelize.define('LEARNPATHS', {
     name : Sequelize.STRING,
     details : Sequelize.STRING
})

//resourcegroups path
var Resourcegroups = sequelize.define('RESOURCEGROUPS', {
     name : Sequelize.STRING,
     details : Sequelize.STRING,
     userid :  Sequelize.INTEGER,
     categoryid : Sequelize.INTEGER,
     learnpathid : Sequelize.INTEGER
})
//users
var Users = sequelize.define('USERS', {
     firstname : Sequelize.STRING,
     lastname : Sequelize.STRING,
     birthday: Sequelize.DATE,
     facebook : Sequelize.STRING,
     email : Sequelize.STRING,
     phone : Sequelize.STRING,
     occupation : Sequelize.STRING,
     company : Sequelize.STRING
})

Resourcegroups.hasMany(Users, {foreignKey : 'id', sourceKey: 'userid'});
Resourcegroups.hasMany(Categories, {foreignKey : 'id', sourceKey: 'categoryid'});
Resourcegroups.hasMany(Learnpaths, {foreignKey : 'id', sourceKey: 'learnpathid'});

Resources.belongsTo(Users, {foreignKey : 'userid', tagetKey: 'id'});
Resources.hasMany(Resourcegroups, {foreignKey : 'id', sourceKey: 'groupid'});

var app = express()


app.use(express.json());

app.use(express.urlencoded()); 


//added nodeadmin interface
app.use('/nodeadmin', nodeadmin(app));

//create a new user
app.post('/users/:id', function(request,response){
    Users.create(request.body).then(function(user){
        response.status(201).send(user);
    })
})

//read all users
app.get('/users', function(request,response){
    Users.findAll().then(function(user){
        response.status(200).send(user)
    })
})

//read user by id

app.get('/users/:id',function(request,response){
    Users.findById(request.params.id).then(function(user){
        if(user){
        response.status(200).send(user);
    } else
        response.status(404).send("not found");
    })
})

//update user

app.put('/users/:id', function(request,response){
    Users.findById(request.params.id).then(function(user){
        if(user){
        user.update(request.body).then(function(user){
            response.status(201).send(user);
        }).catch(function(error){
            response.status(200).send(error);
        })
        }
        else{
            response.status(404).send("not found");
        }
    })
})

//delete user

app.delete('/users/:id',function(request,response){
    Users.findById(request.params.id).then(function(user){
        if(user){
            user.destroy().then(()=>{response.status(204).send();})
        }
        else{
            response.status(404).send("not found");
        }
    })
})

//read all categories
app.get('/categories', function(request,response){
    Categories.findAll().then(function(categories){
        response.status(200).send(categories);
    })
})

//read cateory by id
app.get('/categories/:id', function(request,response){
    Categories.findById(request.params.id).then(function(category){
        if(category){
            response.status(200).send(category);
        }
        else{
            response.status(404).send("not found");
        }
    })
})
//create category
app.post('/categories/:id', function(request,response){
    Categories.findById(request.params.id).then(function(category){
        if(category){
            response.status(200).send("already exists");
        }
        else{
            Categories.create(request.body).then(function(category){
                response.status(201).send(category);
            })
        }
    })
})

//update category

app.put('/categories/:id', function(request,response){
    Categories.findById(request.params.id).then(function(category){
        if(category){
            category.update(request.body).then(function(category){
                response.status(201).send(category);
            }).catch(function(error){
                response.status(200).send("error");
            })
        }else{
            response.status(404).send("not found");
        }
    })
})

app.delete('/categories/:id', function(request,response){
    Categories.findById(request.params.id).then(function(category){
        if(category){
            category.destroy().then(function(){
                response.status(200).send();
            })
        }else{
            response.status(404).send("not found");
        }
    })
})


//read all learnpaths
app.get('/learnpaths', function(request,response){
    Learnpaths.findAll().then(function(learnpaths){
        response.status(200).send(learnpaths);
    })
})

//read learnpath by id
app.get('/learnpaths/:id', function(request,response){
    Learnpaths.findById(request.params.id).then(function(learnpath){
        if(learnpath){
            response.status(200).send(learnpath);
        }
        else{
            response.status(404).send("not found");
        }
    })
})
//create learnpath
app.post('/learnpaths/:id', function(request,response){
    Learnpaths.findById(request.params.id).then(function(learnpath){
        if(learnpath){
            response.status(200).send("already exists");
        }
        else{
            Learnpaths.create(request.body).then(function(learnpath){
                response.status(201).send(learnpath);
            })
        }
    })
})

//update learnpath

app.put('/learnpaths/:id', function(request,response){
    Learnpaths.findById(request.params.id).then(function(learnpath){
        if(learnpath){
            learnpath.update(request.body).then(function(learnpath){
                response.status(201).send(learnpath);
            }).catch(function(error){
                response.status(200).send("error");
            })
        }else{
            response.status(404).send("not found");
        }
    })
})

app.delete('/learnpaths/:id', function(request,response){
    Learnpaths.findById(request.params.id).then(function(learnpath){
        if(learnpath){
            learnpath.destroy().then(function(){
                response.status(200).send();
            })
        }else{
            response.status(404).send("not found");
        }
    })
})

//read all resourcegroups
app.get('/resourcegroups', function(request,response){
    Resourcegroups.findAll().then(function(resourcegroups){
        response.status(200).send(resourcegroups);
    })
})

//read resourcegroup by id
app.get('/resourcegroups/:id', function(request,response){
    Resourcegroups.findById(request.params.id).then(function(resourcegroup){
        if(resourcegroup){
            response.status(200).send(resourcegroup);
        }
        else{
            response.status(404).send("not found");
        }
    })
})
//create resourcegroup
app.post('/resourcegroups/:id', function(request,response){
    Resourcegroups.findById(request.params.id).then(function(resourcegroup){
        if(resourcegroup){
            response.status(200).send("already exists");
        }
        else{
            Resourcegroups.create(request.body).then(function(resourcegroup){
                response.status(201).send(resourcegroup);
            })
        }
    })
})

//update resourcegroup

app.put('/resourcegroups/:id', function(request,response){
    Resourcegroups.findById(request.params.id).then(function(resourcegroup){
        if(resourcegroup){
            resourcegroup.update(request.body).then(function(resourcegroup){
                response.status(201).send(resourcegroup);
            }).catch(function(error){
                response.status(200).send("error");
            })
        }else{
            response.status(404).send("not found");
        }
    })
})

app.delete('/resourcegroups/:id', function(request,response){
    Resourcegroups.findById(request.params.id).then(function(resourcegroup){
        if(resourcegroup){
            resourcegroup.destroy().then(function(){
                response.status(200).send();
            })
        }else{
            response.status(404).send("not found");
        }
    })
})


//facebook login
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;



passport.use(new FacebookStrategy({
    clientID: "1963482977312032",
    clientSecret: "11ee3a175905bd166db11215654b179f",
    callbackURL: "https://studyonline-dragosstrat.c9users.io/auth/facebook/callback",
    //passReqToCallback : true,
    profileFields: ['id', 'emails', 'profileUrl', 'name', 'gender']
  },
  function(accessToken, refreshToken, profile, done) {
    
    
    var me = new Users({
        firstname:profile.name.givenName,
        lastname:profile.name.familyName,
        facebook:profile.profileUrl,
    });
    
    /* save if new */
    

    Users.findOne({where: {facebook: me.facebook}}).then(function(user){
            
            if(user == null){
                console.log("2");;
                me.save(function(err, me) {
                if(err) return done(err);
                done(null,me);
            });
            }else{
                console.log("1");
                done(null, user);
            }
        
        });
    }
));


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('../frontend/'));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/index.html',
                                      failureRedirect: '/login' }));
app.get('/auth/facebook', passport.authenticate('facebook', { 
      scope : ['public_profile', 'email']
    }));


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
}

app.get('/', isLoggedIn, function(req, res, next) {
    if(req.user){
        return next();
        res.sendfile(__dirname + '/frontend/home.html');
    }
    
});

app.get('/login', isLoggedIn, function(req, res, next) {
   //code
});

app.listen(8080);