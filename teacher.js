// teacher.js

let inactivityTime = 60 * 60 * 1000; // 1 hour
let inactivityTimer;

// Check auth state and role
auth.onAuthStateChanged((user)=>{
  if(!user) window.location.href="index.html";

  db.collection("users").doc(user.uid).get().then((doc)=>{
    if(!doc.exists || doc.data().role !== "teacher"){
      window.location.href="dashboard.html";
      return;
    }

    resetTimer();
    setupActivityListeners();
  });
});

// Logout
function logout(){
  auth.signOut()
    .then(()=>window.location.href="index.html")
    .catch(error=>alert("Error: "+error.message));
}

// Inactivity timer
function resetTimer(){
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(()=>{
    alert("Logged out due to 1 hour of inactivity.");
    logout();
  }, inactivityTime);
}

// Track activity
function setupActivityListeners(){
  const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
  events.forEach(event => {
    document.addEventListener(event, resetTimer, true);
  });
}

// Create Assignment
function createAssignment(){
  db.collection("assignments").add({
    classID: document.getElementById("classID").value,
    title: document.getElementById("title").value,
    dueDate: document.getElementById("dueDate").value
  });
  alert("Assignment created");
}

// Submit Grade
function submitGrade(){
  db.collection("grades").add({
    studentID: document.getElementById("studentID").value,
    assignmentID: document.getElementById("assignmentID").value,
    score: Number(document.getElementById("score").value)
  });
  alert("Grade submitted");
}

// Button event listeners
document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("createAssignmentBtn").addEventListener("click", createAssignment);
document.getElementById("submitGradeBtn").addEventListener("click", submitGrade);
