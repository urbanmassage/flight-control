var mongoose = require('mongoose');
var async = require('async');

var collections = require('./collections');

var dbURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/flight_control';

var cachedDB = null;

var connectQueue = [];
var connecting = false;
var connected = false;

var connect = function(done) {
    console.log('lib/mongo::connect()');
    
    if(connected) {
        console.log('lib/mongo::connect() already connected');
        return done(null);
    }
    
    if(connecting) {
        console.log('Adding item to mongodb connect queue');
        return connectQueue.push(done);
    }

    connecting = true;
    
    var cb = function() {
        done(null);
    
        if(connectQueue.length > 0) {
            for(var i=0; i<connectQueue.length; i++) {
                connectQueue[i]();
            }
        }
    };

    mongoose.connect(dbURL);

    var db = mongoose.connection;
    db.on('error', function(err) {
        throw err;
    });
    db.once('open', function (callback) {
        collections.define(db, function(err) {
            if(err) throw err;

            cachedDB = db;
            global.mongo = db;
            connected = true;   
            
            cb(null);
        });
    });
};

connect(function() {
    console.log('lib/mongo::connected');
});

module.exports = {    
    express: function (req, res, next) {
        async.series([
            function(callback) {
                if(cachedDB != null) {
                    return callback();
                }
                
                // not connected yet
                connect(function() {
                    callback();
                });
            },
            function() {
                req.mongo = cachedDB;
                
                next();
            }
        ]);
    },
    
    connect: function(cb) {
        connect(cb);
    }
};