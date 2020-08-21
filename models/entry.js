const mongoose = require('mongoose');

//////////////////////////////////////
//          Entry Schema            //
//////////////////////////////////////

const entrySchema = new mongoose.Schema({

    text: {
        type: String,
        required: true,
    },
    mood: {
        type: String,
        required: true,
        default: '00000000',
    },
    createDate: {
        type: Date,
        required: true,
    },
    updateDate: {
        type: Date,
    }
})

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;