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

  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrainTime = $("#first-train-time").val().trim();
  frequency = $("#frequency").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  console.log(firstTrainTime);

  var currentTime = momemt();
  console.log("CURRENT TIME: " + momemt(currentTime).format("hh:mm"));

  console.log("HELLO");
  database.ref().push({

    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
    // nextArrival: nextArrival,
    // minutesAway: minutesAway,
    // dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

//   emptyIt();

});

// function emptyIt(){
//     $("#form-train").reset();
// };


database.ref().on("child_added", function(childSnapshot) {
    var cSv = childSnapshot.val();

    console.log(cSv.trainName);
    console.log(cSv.destination);
    console.log(cSv.firstTrainTime);
    console.log(cSv.frequency);
    // console.log(cSv.nextArrival);
    // console.log(cSv.minutesAway);

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + "minutesAway" + "</td></tr>");
    
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    
});

// database.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot){
//     $("#td-train-name").text(cSv.trainName);
//     $("#td-destination").text(snapshot.val().destination);
//     $("#td-first-train-time").text(snapshot.val().firstTrainTime);
//     $("#td-frequency").text(snapshot.val().frequency);
//     $("#td-next-arrival").text(snapshot.val().nextArrival);
//     $("#td-minutes-away").text(snapshot.val().minutesAway);
// });