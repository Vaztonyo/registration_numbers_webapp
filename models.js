const mongoose = require('mongoose');
module.exports = function(mongoUrl){
    mongoose.connect(mongoUrl);

    const NumberSchema = mongoose.Schema({name : String});
    NumberSchema.index({name : 1}, {unique : true});

    const Regisnumber = mongoose.model('Regisnumber', NumberSchema);

    return {
        Regisnumber
    };
}
