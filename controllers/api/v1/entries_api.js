const Entry= require('../../../models/entry');

module.exports.index= async function(req,res){


    let entries= await Entry.find({})
        .sort('-createdAt')
        .populate('user')




    return res.json(200, {
        message: "List of entries",
        entries: entries
    })
}