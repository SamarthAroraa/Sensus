import React, { useState, useEffect } from "react";
import axios from "axios";
// react component used to create a calendar with events on it
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts
import { Table, Button } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const qs = require("querystring");

const EntryList = (props) => {
  const [entryList, setEntryList] = useState([]);
  let color_text = {
    H: {
      color: "black",
    },
    S: {},
    N: {},
  };
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/api/v1/entries/",
        qs.stringify({ user: props.auth.user.id })
      )
      // .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setEntryList(res.data);
      });
  }, []);
  const deleteItem = (entry_id) => {
    const newEntryList = entryList.filter((item) => item._id != entry_id);
    setEntryList(newEntryList);
    axios
      .post(
        "http://localhost:5000/api/v1/entries/delete",
        qs.stringify({ userId: props.auth.user.id, entryId: entry_id })
      )
      // .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="content">
      <h1>Your Entry List</h1>
      <Table responsive>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>Entry Name</th>
            <th></th>
            <th className="text-center">Entry Date</th>
            <th className="text-right"></th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entryList.map((entry, index) => {
            let font_col = color_text[entry.category];
            return (
              <tr
                key={index}
                style={{ backgroundColor: entry.mood, fontWeight: "bold" }}
              >
                <td className="text-center">
                  <span style={font_col}>{index + 1}</span>
                </td>

                <td>
                  <span style={font_col}>{entry.title ? entry.title : ""}</span>
                </td>

                <td></td>
                <td className="text-center">
                  <span style={font_col}>{entry.createDate}</span>
                </td>
                <td className="text-right"></td>
                <td className="text-right">
                  {` `}
                  <Button className="btn-icon" color="success" size="sm">
                    <i className="fa fa-edit"></i>
                  </Button>
                  {` `}
                  <Button
                    className="btn-icon"
                    color="danger"
                    size="sm"
                    onClick={() => deleteItem(entry._id)}
                  >
                    <i className="fa fa-times" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

EntryList.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(EntryList));
