var config = {
  apiKey: "AIzaSyDFyStCxB0BHniHi0rKgXyYI3qNRjbMlAM",
  authDomain: "trainschedule-b25d1.firebaseapp.com",
  databaseURL: "https://trainschedule-b25d1.firebaseio.com",
  projectId: "trainschedule-b25d1",
  storageBucket: "trainschedule-b25d1.appspot.com",
  messagingSenderId: "327865599795"
};
firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";
var nextArrival = "";
var minutesAway = "";

$("#add-train").on("click", function(event) {
  event.preventDefault();

  trainName = $("#train-name")
    .val()
    .trim();
  destination = $("#destination")
    .val()
    .trim();
  firstTrainTime = $("#first-train-time")
    .val()
    .trim();
  frequency = $("#frequency")
    .val()
    .trim();

  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  console.log(firstTrainTime);

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    nextArrival: nextArrival,
    minutesAway: minutesAway
    // dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  database.ref().on(
    "child_added",
    function(childSnapshot) {
      var cSv = childSnapshot.val();

      console.log(cSv.trainName);
      console.log(cSv.destination);
      console.log(cSv.firstTrainTime);
      console.log(cSv.frequency);
      // console.log(cSv.nextArrival);
      // console.log(cSv.minutesAway);

      // Declare variable
      var frequency;

      // Time is to be entered on the entry form

      var firstTimeConverted = moment(firstTrianTime, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var nextArrival = diffTime % frequency;
      console.log(nextArrival);

      // Minute Until Train
      var minutesAway = frequency - nextArrival;
      console.log("MINUTES TILL TRAIN: " + minutesAway);

      // Next Train
      var nextTrain = moment().add(minutesAway, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

      $("#train-table > tbody").append(
        "<tr><td>" +
          trainName +
          "</td><td>" +
          destination +
          "</td><td>" +
          frequency +
          "</td><td>" +
          nextArrival +
          "</td><td>" +
          minutesAway +
          "</td></tr>"
      );
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );
});
