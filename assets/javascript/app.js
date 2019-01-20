// Initialize Firebase
var config = {
    apiKey: "AIzaSyCyWiFWhCI2Bnco18Va_mXqSkmcSZ4a1Vg",
    authDomain: "train-scheduler-725a9.firebaseapp.com",
    databaseURL: "https://train-scheduler-725a9.firebaseio.com",
    projectId: "train-scheduler-725a9",
    storageBucket: "train-scheduler-725a9.appspot.com",
    messagingSenderId: "580187216610"
  };
  firebase.initializeApp(config);
// Store the Firebase database into a variable
var database = firebase.database();
// Create a function to run once the document has loaded
$(document).ready(function(){
    // Create a function to run when a new train is submited
    $("#add-train").on("click", function(event){
        // Prevent the default behavior of the Submit button
        event.preventDefault();

        // Store the user's input into variables
        var name = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTime = $("#first-time-input").val().trim();
        var frequency = $("#frequency-input").val().trim();
        // Push variables to firebase
        database.ref().push({
            name : name,
            destination : destination,
            firstTime : firstTime,
            frequency : frequency,
            dateAdded : firebase.database.ServerValue.TIMESTAMP
        });
        console.log(firstTime);
    });

    // Create a variable to store the current time
    var currentTime = moment().format("HH:mm");
    console.log(currentTime);

    // Calculate the next arrival (firstTime + frequency)

    
    // Create a function to run when a new child is added to Firebase
    database.ref().orderByChild("dataAdded").on("child_added", function(snapshot){
        // Create a variable to store the snapshot value
        var value = snapshot.val();
        // Create a new table data for each input
        var row = $("<th>").attr("scope", "row").text(value.name);
        var newName = $("<td>").text(value.name);
        var newDestination = $("<td>").text(value.destination);
        var newFrequency = $("<td>").text(value.frequency);
        var nextArrival = $("<td>").text();
        var minutesAway = $("<td>").text();
        // Create a new row and add input to HTML
        var tr = $("<tr>").append(newName, newDestination, newFrequency, nextArrival. minutesAway);
        $("#trains").append(tr);
    });
});

