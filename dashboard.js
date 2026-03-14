// dashboard.js

let inactivityTime = 60 * 60 * 1000; // 1 hour
let inactivityTimer;

// Check auth state and redirect based on role
auth.onAuthStateChanged((user) => {
  if(!user){
    window.location.href = "index.html";
    return;
  }

  db.collection("users").doc(user.uid).get().then((doc)=>{
    if(!doc.exists){
      alert("User record not found");
      auth.signOut();
      window.location.href="index.html";
      return;
    }

    const role = doc.data().role;

    if(role === "teacher"){
      window.location.href="teacher.html";
      return;
    }

    // Student: load grades and start inactivity timer
    loadGrades(user.uid);
    resetTimer();
    setupActivityListeners();
  });
});

// Load student grades
function loadGrades(studentID){
  db.collection("grades")
    .where("studentID","==",studentID)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        const g = doc.data();
        document.getElementById("grades").innerHTML +=
          `<tr><td>${g.assignmentID}</td><td>${g.score}</td></tr>`;
      });
    });
}

// Logout
function logout(){
  auth.signOut()
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Error signing out: " + error.message);
    });
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

// Logout button
document.getElementById("logoutBtn").addEventListener("click", logout);
