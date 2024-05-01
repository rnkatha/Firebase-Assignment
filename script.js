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
var taskInput = window.document.getElementById('myInput').value;
console.log(" " +taskInput);
// remove empty spaces at the beginning and at the end of the string value
const task = taskInput;   
console.log(" "+task);
if (task !== "") {  
  db.collection("tasks").add({ 
    task: task,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  taskInput.value = "";
  console.log("Task added.");
}
}

// Function to render tasks
function renderTasks(doc) {
  const taskList = document.getElementById("task-list");
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
  `;
  taskList.appendChild(taskItem);
}

// Real-time listener for tasks
db.collection("tasks")
  .orderBy("timestamp", "desc")
  .onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
      if (change.type === "added") {
        renderTasks(change.doc);
      }
    });
  });

// Function to delete a task
function deleteTask(id) {
  db.collection("tasks").doc(id).delete();
}