const Entry= require('../../../models/entry');

module.exports.index= async function(req,res){


    let entries= await Entry.find({})
        .sort('-createdAt')
        .populate('user')




    return res.send(200).json({
        message: "List of entries",
        entries: entries
    })
}