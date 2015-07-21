var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
    define: function(db, cb) {
        var transactionSchema = new Schema({
            id: String,

            timestamp: Date,
            system: String,
            hostname: String,
            env: String,

            time: Number,
            type: String,
            parent: String,
            data: {
                type: Schema.Types.Mixed,
                default: {}
            }
        }, { 
            capped: 1000000000 // 1 GB 
        });

        db.models.transaction = mongoose.model('transactions', transactionSchema);
        cb();
    }
};