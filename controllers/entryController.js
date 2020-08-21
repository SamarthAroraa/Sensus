const mongoose = require('mongoose');
const db = require('../config/mongoose');
const Entry = require('../models/entry');

const entryController = {

    add: (text, mood) => {

        const entry = new Entry({
            text: text,
            mood: mood,
            createDate: Date.now(),
        });

        entry.save(err => {
            if (err) {
                console.error(err);
            } else {
                console.log('Entry Saved');
            }
        })
    },

    update: (id, text, mood) => {

        Entry.updateOne({
                _id: id
            }, {
                text: text,
                mood: mood,
                updateDate: Date.now(),
            },
            err => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Entry Updated');
                }
            });
    },

    search: (text) => {

        var result;

        Entry.find({
            text: text
        }, (err, found) => {
            if (err) {
                console.error(err);
            } else {
                result = found;
            }
        });

        return result;
    }
}

module.exports = entryController;