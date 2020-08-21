const mongoose = require("mongoose");

//////////////////////////////////////
//          Entry Schema            //
//////////////////////////////////////

const entrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    mood: {
        type: String,
        required: true,
        default: "#ffffff",
    },
    createDate: {
        type: Date,
        required: true,
        default: Date(Date.now() + Date.getTimezoneOffset()), //offset returns the milliseconds difference of the current location from the UTC timezone.
    },
    updateDate: {
        type: Date,
        default: Date(Date.now() + Date.getTimezoneOffset()), //Adding the offset sets the date to the local one.
    },
}, {
    timestamps: true,
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;