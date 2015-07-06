module.exports = {
    define: function(db, cb) {
        require('./collections/transaction').define(db, function(err) {
            if(err) throw err;

            require('./collections/log').define(db, function(err) {
            	if(err) throw err;

            	cb();
            });
        });
    }
};