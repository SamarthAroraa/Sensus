const Entry = require("../../../models/entry");
const User = require("../../../models/user");
const ObjectId = require("mongodb").ObjectID;

module.exports.getAnnualData = async function (req, res) {
  var complete = {};
  var global = {};
  try {
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
            // average: { $avg: "$count" },

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
        console.log(result);
        return result;
      }
    );
    global.N = await Entry.aggregate(
      [
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

    global.H = await Entry.aggregate(
      [
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
    complete.user = data;
    complete.global = global;
    return res.status(200).json(complete);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.getTotalData = async function (req, res) {
  //Pipeline to accumulate entries from user and not entries.
  var data = {};
  try {
    data.H = await User.aggregate(
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

    data.S = await User.aggregate(
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
                  $eq: ["$$entry.category", "S"],
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

    data.N = await User.aggregate(
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
                  $eq: ["$$entry.category", "N"],
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
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.getWeeklyData = async function (req, res) {
  try {
    let user = ObjectId(req.body.user);
    let entries = await Entry.aggregate(
      [
        { $match: { user: user } },
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
            },
          },
        },

        {
          $group: {
            _id: {
              month: { $month: "$createdAt" },
              day: { $dayOfMonth: "$createdAt" },
            },
            val: { $first: "$category" },
          },
        },
      ],

      (err, result) => {
        if (err) {
          console.log(err);
        } // TODO handle error
        console.log(result);
        return result;
      }
    );

    return res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
