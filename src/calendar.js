


  "use strict";
  import {getLoggedInUserName} from './utils/dataUtils.js';
  import * as types from './backend/types.js';

  // Setup the calendar with the current date
  $(document).ready(function () {
    let date = new Date();
    let today = date.getDate();
    // Set click handlers for DOM elements
    $(".right-button").click({ date: date }, next_year);
    $(".left-button").click({ date: date }, prev_year);
    $(".month").click({ date: date }, month_click);
    $("#add-button").click({ date: date }, new_event);
    // Set current month as active
    $(".months-row").children().eq(date.getMonth()).addClass("active-month");
    init_calendar(date);
    let events = check_events(today, date.getMonth() + 1, date.getFullYear());
    show_events(events, months[date.getMonth()], today);
  });

  // Initialize the calendar by appending the HTML dates
  function init_calendar(date) {
    $(".tbody").empty();
    $(".events-container").empty();
    let calendar_days = $(".tbody");
    let month = date.getMonth();
    let year = date.getFullYear();
    let day_count = days_in_month(month, year);
    let row = $("<tr class='table-row'></tr>");
    let today = date.getDate();
    // Set date to 1 to find the first day of the month
    date.setDate(1);
    let first_day = date.getDay();
    // 35+firstDay is the number of date elements to be added to the dates table
    // 35 is from (7 days in a week) * (up to 5 rows of dates in a month)
    for (let i = 0; i < 35 + first_day; i++) {
      // Since some of the elements will be blank,
      // need to calculate actual date from index
      let day = i - first_day + 1;
      // If it is a sunday, make a new row
      if (i % 7 === 0) {
        calendar_days.append(row);
        row = $("<tr class='table-row'></tr>");
      }
      // if current index isn't a day in this month, make it blank
      if (i < first_day || day > day_count) {
        let curr_date = $("<td class='table-date nil'>" + "</td>");
        row.append(curr_date);
      } else {
        let curr_date = $("<td class='table-date'>" + day + "</td>");
        let events = check_events(day, month + 1, year);
        if (today === day && $(".active-date").length === 0) {
          curr_date.addClass("active-date");
          show_events(events, months[month], day);
        }
        // If this date has any events, style it with .event-date
        if (events.length !== 0) {
          curr_date.addClass("event-date");
        }
        // Set onClick handler for clicking a date
        curr_date.click(
          { events: events, month: months[month], day: day },
          date_click
        );
        row.append(curr_date);
      }
    }
    // Append the last row and set the current year
    calendar_days.append(row);
    $(".year").text(year);

  }

  async function loadPostsFromServer() {
    const response = await fetch('post/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: {
        userName: getLoggedInUserName()
      }
    });
    if (response.ok) {
      for (let post in response.posts) {
        new_event(post.timeInterval.start); //Add posts to calendar UI
      }
    }
  }

  // Get the number of days in a given month/year
  function days_in_month(month, year) {
    let monthStart = new Date(year, month, 1);
    let monthEnd = new Date(year, month + 1, 1);
    return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
  }

  // Event handler for when a date is clicked
  function date_click(event) {
    $(".events-container").show(250);
    $("#dialog").hide(250);
    $(".active-date").removeClass("active-date");
    $(this).addClass("active-date");
    show_events(event.data.events, event.data.month, event.data.day);
  }

  // Event handler for when a month is clicked
  function month_click(event) {
    $(".events-container").show(250);
    $("#dialog").hide(250);
    let date = event.data.date;
    $(".active-month").removeClass("active-month");
    $(this).addClass("active-month");
    let new_month = $(".month").index(this);
    date.setMonth(new_month);
    init_calendar(date);
  }

  // Event handler for when the year right-button is clicked
  function next_year(event) {
    $("#dialog").hide(250);
    let date = event.data.date;
    let new_year = date.getFullYear() + 1;
    $("year").html(new_year);
    date.setFullYear(new_year);
    init_calendar(date);
  }

  // Event handler for when the year left-button is clicked
  function prev_year(event) {
    $("#dialog").hide(250);
    let date = event.data.date;
    let new_year = date.getFullYear() - 1;
    $("year").html(new_year);
    date.setFullYear(new_year);
    init_calendar(date);
  }

  // Event handler for clicking the new event button
  function new_event(event) {
    // if a date isn't selected then do nothing
    if ($(".active-date").length === 0) return;
    // remove red error input on click
    $("input").click(function () {
      $(this).removeClass("error-input");
    });
    // empty inputs and hide events
    $("#dialog input[type=text]").val("");
    $("#dialog input[type=number]").val("");
    $(".events-container").hide(250);
    $("#dialog").show(250);
    // Event handler for cancel button
    $("#cancel-button").click(function () {
      $("#name").removeClass("error-input");
      $("#count").removeClass("error-input");
      $("#dialog").hide(250);
      $(".events-container").show(250);
    });
    // Event handler for ok button
    $("#ok-button")
      .unbind()
      .click({ date: event.data.date }, function () {
        let date = event.data.date;
        let timeStart = document.getElementById("start-time-appt").value;
        let timeEnd = document.getElementById("end-time-appt").value;
        console.log("Appt range: " + timeStart + " to " + timeEnd);
        let name = $("#name").val().trim();
        //let count = parseInt($("#count").val().trim());
        let day = parseInt($(".active-date").html());
        // Basic form validation
        if (name.length === 0) {
          $("#name").addClass("error-input");
        } else if (isNaN(/*count¨*/0)) {
          //$("#count").addClass("error-input");
        } else {
          $("#dialog").hide(250);
          console.log("new event");
          new_event_json(name, date, day, timeStart, timeEnd);
          date.setDate(day);
          init_calendar(date);
        }
      });
  }

  // Adds a json event to event_data
  function new_event_json(name, date, day, t1, t2) {
    let event = {
      occasion: name,
      //invited_count: count,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: day,
    };
    let startDate = new Date(date);
    startDate.setDate(day);
    startDate.setHours(t1.substring(0, 2));
    startDate.setMinutes(t1.substring(3));
    console.log("Start Date/Time: " + startDate);
    //console.log("Hours: " + t1.substring(0, 2) + "///" + "Minutes: " + t1.substring(3));
    //let endDate = ;
    let endDate = new Date(date);
    endDate.setDate(day);
    endDate.setHours(t2.substring(0, 2));
    endDate.setMinutes(t2.substring(3));
    console.log("End Date/Time: " + endDate);
    event_data["events"].push(event);
    sendPostToServer(startDate, endDate, name);

  }

 async function sendPostToServer(startDate, endDate, location) {
    const userName = "testuser";
    const attendees = ["user1", "user2"];
    const response = await fetch('post/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: {
        id: "0000000", //Placeholder post ID
        author: userName,
        attendees: attendees,
        location: location,
        timeInterval: {
          start: startDate,
          end: endDate
        },
        chatId: "000000",
        visibleTo: []
      }
    }).then(response => response.json());

    if (response.ok) {
      alert("Meal booked succesfully on server!");
    } else {
      alert("There was a problem booking meal!");
    }
  }

  // Display all events of the selected date in card views
  function show_events(events, month, day) {
    // Clear the dates container
    $(".events-container").empty();
    $(".events-container").show(250);
    //console.log(event_data["events"]);
    // If there are no events for this date, notify the user
    if (events.length === 0) {
      let event_card = $("<div class='event-card'></div>");
      let event_name = $(
        "<div class='event-name'>There are no events planned for " +
          month +
          " " +
          day +
          ".</div>"
      );
      $(event_card).css({ "border-left": "10px solid #FF1744" });
      $(event_card).append(event_name);
      $(".events-container").append(event_card);
    } else {
      // Go through and add each event as a card to the events container
      for (let i = 0; i < events.length; i++) {
        let event_card = $("<div class='event-card'></div>");
        let event_name = $(
          "<div class='event-name'>" + events[i]["occasion"] + ":</div>"
        );
        let event_count = $(
          "<div class='event-count'>" +
            events[i]["invited_count"] +
            " Invited</div>"
        );
        if (events[i]["cancelled"] === true) {
          $(event_card).css({
            "border-left": "10px solid #FF1744",
          });
          event_count = $("<div class='event-cancelled'>Cancelled</div>");
        }
        $(event_card).append(event_name).append(event_count);
        $(".events-container").append(event_card);
      }
    }
  }

  // Checks if a specific date has any events
  function check_events(day, month, year) {
    let events = [];
    for (let i = 0; i < event_data["events"].length; i++) {
      let event = event_data["events"][i];
      if (
        event["day"] === day &&
        event["month"] === month &&
        event["year"] === year
      ) {
        events.push(event);
      }
    }
    return events;
  }

  // Given data for events in JSON format
  let event_data = {
    events: [
      {
        occasion: " Repeated Test Event ",
        invited_count: 120,
        year: 2020,
        month: 5,
        day: 10,
        cancelled: true,
      },
      {
        occasion: " Repeated Test Event ",
        invited_count: 120,
        year: 2020,
        month: 5,
        day: 10,
        cancelled: true,
      },
      {
        occasion: " Repeated Test Event ",
        invited_count: 120,
        year: 2020,
        month: 5,
        day: 10,
        cancelled: true,
      },
      {
        occasion: " Repeated Test Event ",
        invited_count: 120,
        year: 2020,
        month: 5,
        day: 10,
      },
      {
        occasion: " Repeated Test Event ",
        invited_count: 120,
        year: 2020,
        month: 5,
        day: 10,
        cancelled: true,
      },
      {
        occasion: " Repeated Test Event ",
        invited_count: 120,
        year: 2020,
        month: 5,
        day: 10,
      },
      {
        occasion: " Repeated Test Event ",
        invited_count: 120,
        year: 2020,
        month: 5,
        day: 10,
        cancelled: true,
      },
      {
        occasion: " Repeated Test Event ",
        invited_count: 120,
        year: 2020,
        month: 5,
        day: 10,
      },
      {
        occasion: " Repeated Test Event ",
        invited_count: 120,
        year: 2020,
        month: 5,
        day: 10,
        cancelled: true,
      },
      {
        occasion: " Repeated Test Event ",
        invited_count: 120,
        year: 2020,
        month: 5,
        day: 10,
      },
      {
        occasion: " Test Event",
        invited_count: 120,
        year: 2020,
        month: 5,
        day: 11,
      },
    ],
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


