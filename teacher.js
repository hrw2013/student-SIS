auth.onAuthStateChanged((user)=>{
  if(!user) window.location.href="index.html";

  db.collection("users").doc(user.uid).get().then((doc)=>{
    if(doc.data().role !== "teacher"){
      window.location.href="dashboard.html";
    }
  });
});

function createAssignment(){
  db.collection("assignments").add({
    classID: document.getElementById("classID").value,
    title: document.getElementById("title").value,
    dueDate: document.getElementById("dueDate").value
  });
  alert("Assignment created");
}

function submitGrade(){
  db.collection("grades").add({
    studentID: document.getElementById("studentID").value,
    assignmentID: document.getElementById("assignmentID").value,
    score: Number(document.getElementById("score").value)
  });
  alert("Grade submitted");
}

function logout(){
  auth.signOut();
  window.location.href="index.html";
}
