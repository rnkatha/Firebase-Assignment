// Initialize Firebase with your config
firebase.initializeApp({
    //what you copied on text file
    apiKey: "AIzaSyDvbok-zgoQQOtjNV-pwcObZs-e6LMEKtg",
    authDomain: "plp-app-59b40.firebaseapp.com",
    projectId: "plp-app-59b40",
    storageBucket: "plp-app-59b40.appspot.com",
    messagingSenderId: "707422415286",
    appId: "1:707422415286:web:39e2e63094561edb5f3917"
}); 

//declare variable
const db = firebase.firestore();

// Function to add a task
function addTask() {
  var taskInput = window.document.getElementById('task-input').value;
  console.log("check input " +taskInput);
  // remove empty spaces at the beginning and at the end of the string value
  const task = taskInput;   
  console.log("check if task is empty "+task);
  if (task !== "") {  
    db.collection("tasks").add({ 
      task: task,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    taskInput.value = "";
    console.log("Task added.");
  }
}

