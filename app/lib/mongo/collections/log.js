var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
    define: function(db, cb) {
        var logSchema = new Schema({
        	timestamp: Date,
            system: String,
            hostname: String,
            env: String,

            level: String,
            transaction: String,
            data: {
                type: Schema.Types.Mixed,
                default: {}
            }
        }, { 
            capped: 2000000000 // 2 GB
        });

        db.models.log = mongoose.model('logs', logSchema);
        cb();
    }
};