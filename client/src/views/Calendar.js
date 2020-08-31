import React from "react";
// react component used to create a calendar with events on it
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";

// import { events } from 'variables/general.js';

const localizer = momentLocalizer(moment);

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          title: "Test Entry 1",
          start: Date.now(),
          end: Date.now(),
          allDay: true,
          color: "red",
        },
      ],
      alert: null,
    };
    this.hideAlert = this.hideAlert.bind(this);
  }
  selectedEvent(event) {
    alert(event.title);
  }
  addNewEventAlert(slotInfo) {
    this.setState({
      alert: (
        <SweetAlert
          input
          showCancel
          style={{ display: "block", marginTop: "", color: "black" }}
          title="Input something"
          onConfirm={(e) => this.addNewEvent(e, slotInfo)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
        />
      ),
    });
  }
  addNewEvent(e, slotInfo) {
    var newEvents = this.state.events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end,
    });
    this.setState({
      alert: null,
      events: newEvents,
    });
  }
  hideAlert() {
    this.setState({
      alert: null,
    });
  }
  eventColors(event, start, end, isSelected) {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "primary");
    return {
      className: backgroundColor,
    };
  }
  render() {
    return (
      <div className="content">
        {this.state.alert}

        <BigCalendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView="month"
          scrollToTime={new Date(1970, 1, 1, 6)}
          startAccessor="start"
          defaultDate={new Date()}
          onSelectEvent={(event) => this.selectedEvent(event)}
          onSelectSlot={(slotInfo) => this.addNewEventAlert(slotInfo)}
          eventPropGetter={this.eventColors}
          endAccessor="end"
          style={{ height: 600 }}
        />
      </div>
    );
  }
}

export default Calendar;
