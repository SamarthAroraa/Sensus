const Entry = require("../../../models/entry");
const User = require("../../../models/user");
const SentimentApi = require("../../sentimentAPI");
const ObjectId = require("mongodb").ObjectID;

module.exports.getAnnualData = async function (req, res) {
   Entry.aggregate(
    { $match: { user:req.user } },

    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: { year: "$_id.year", month: "$_id.month" },
        dailyusage: { $push: { day: "$_id.day", count: "$count" } },
      },
    },
    {
      $group: {
        _id: { year: "$_id.year" },
        monthlyusage: {
          $push: { month: "$_id.month", dailyusage: "$dailyusage" },
        },
      },
    },
    function (err, res) {
      if (err); // TODO handle error
      console.log(res);
    }
  );
};
module.exports.getTotalData = function (req, res) {};
