import React,{useState, useEffect} from "react";

// react component used to create a calendar with events on it
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts
import { Table, Button } from "reactstrap";



const EntryList = (props) => {
  const[entryList,setEntryList] = useState([]);
  useEffect(()=>{
    fetch('/api/v1/user-entries/',)
  })

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
          <tr>
            <td className="text-center">1</td>
            <td>Andrew Mike</td>
            <td>Develop</td>
            <td className="text-center">2013</td>
            <td className="text-right">€ 99,225</td>
            <td className="text-right">
              <Button className="btn-icon" color="info" size="sm">
                <i className="fa fa-user"></i>
              </Button>
              {` `}
              <Button className="btn-icon" color="success" size="sm">
                <i className="fa fa-edit"></i>
              </Button>
              {` `}
              <Button className="btn-icon" color="danger" size="sm">
                <i className="fa fa-times" />
              </Button>
            </td>
          </tr>
          <tr>
            <td className="text-center">2</td>
            <td>Manuel Rico</td>
            <td>Manager</td>
            <td className="text-center">2012</td>
            <td className="text-right">€ 99,201</td>
            <td className="text-right">
              <Button className="btn-icon btn-round" color="info" size="sm">
                <i className="fa fa-user"></i>
              </Button>
              {` `}
              <Button className="btn-icon btn-round" color="success" size="sm">
                <i className="fa fa-edit"></i>
              </Button>
              {` `}
              <Button className="btn-icon btn-round" color="danger" size="sm">
                <i className="fa fa-times" />
              </Button>
              {` `}
            </td>
          </tr>
          <tr>
            <td className="text-center">3</td>
            <td>Alex Mike</td>
            <td>Designer</td>
            <td className="text-center">2012</td>
            <td className="text-right">€ 99,201</td>
            <td className="text-right">
              <Button className="btn-icon btn-simple" color="info" size="sm">
                <i className="fa fa-user"></i>
              </Button>
              {` `}
              <Button className="btn-icon btn-simple" color="success" size="sm">
                <i className="fa fa-edit"></i>
              </Button>
              {` `}
              <Button className="btn-icon btn-simple" color="danger" size="sm">
                <i className="fa fa-times" />
              </Button>
              {` `}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default EntryList;
