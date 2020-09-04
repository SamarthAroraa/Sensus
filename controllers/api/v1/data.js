const Entry = require("../../../models/entry");
const User = require("../../../models/user");
const SentimentApi = require("../../sentimentAPI");
const ObjectId = require("mongodb").ObjectID;

module.exports.getAnnualData = async function (req, res) {
  var complete = {};
  var global = {};
  global.S = await Entry.aggregate(
    [
      // { $match: { user: ObjectId(req.body.user) } },
      { $match: { category: "S" } },

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
          dailyentries: { $push: { day: "$_id.day", count: "$count" } },
        },
      },

      {
        $group: {
          _id: { year: "$_id.year" },
          monthlyentries: {
            $push: { month: "$_id.month", dailyentries: "$dailyentries" },
          },
        },
      },
    ],

    (err, result) => {
      if (err) {
        console.log(err);
      } // TODO handle error
      // console.log(result);
      return result;
    }
  );
  var data = {};
  //Pipline to accumulate all Sad classified entries
  data.S = await Entry.aggregate(
    [
      { $match: { user: ObjectId(req.body.user) } },
      { $match: { category: "S" } },

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
          dailyentries: { $push: { day: "$_id.day", count: "$count" } },
        },
      },

      {
        $group: {
          _id: { year: "$_id.year" },
          monthlyentries: {
            $push: { month: "$_id.month", dailyentries: "$dailyentries" },
          },
        },
      },
    ],

    (err, result) => {
      if (err) {
        console.log(err);
      } // TODO handle error
      // console.log(result);
      return result;
    }
  );
  //Pipline to accumulate all Neutral [N] classified entries

  data.N = await Entry.aggregate(
    [
      { $match: { user: ObjectId(req.body.user) } },
      { $match: { category: "N" } },

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
          dailyentries: { $push: { day: "$_id.day", count: "$count" } },
        },
      },

      {
        $group: {
          _id: { year: "$_id.year" },
          monthlyentries: {
            $push: { month: "$_id.month", dailyentries: "$dailyentries" },
          },
        },
      },
    ],

    (err, result) => {
      if (err) {
        console.log(err);
      } // TODO handle error
      // console.log(result);
      return result;
    }
  );

  //Pipline to accumulate all Happy [H] classified entries

  data.H = await Entry.aggregate(
    [
      { $match: { user: ObjectId(req.body.user) } },
      { $match: { category: "H" } },

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
          dailyentries: { $push: { day: "$_id.day", count: "$count" } },
        },
      },

      {
        $group: {
          _id: { year: "$_id.year" },
          monthlyentries: {
            $push: { month: "$_id.month", dailyentries: "$dailyentries" },
          },
        },
      },
    ],

    (err, result) => {
      if (err) {
        console.log(err);
      } // TODO handle error
      // console.log(result);
      return result;
    }
  );

  //Pipeline to accumulate entries from user and not entries.

  data.Test = await User.aggregate(
    [
      //Match the user id
      { $match: { _id: ObjectId(req.body.user) } },

      //Populates the entries from the entries database
      {
        $lookup: {
          from: "entries",
          localField: "entries",
          foreignField: "_id",
          as: "entries",
        },
      },

      //projects only the entries field after filtering
      {
        $project: {
          _id: false,
          entries: {
            $filter: {
              input: "$entries",
              as: "entry",
              cond: {
                $eq: ["$$entry.category", "H"],
              },
            },
          },
        },
      },
    ],
    (err, user) => {
      if (err) {
        console.log(err);
      }

      console.log(user);

      return user;

      
    }
  );

  return res.status(200).json(data);
};
module.exports.getTotalData = function (req, res) {};
