auth.onAuthStateChanged((user)=>{

if(!user){
window.location.href="index.html";
return;
}

checkRole(user.uid);

});

function checkRole(uid){

db.collection("users").doc(uid).get().then((doc)=>{

if(!doc.exists){
alert("User record not found");
return;
}

const data = doc.data();

if(data.role === "teacher"){
window.location.href = "teacher.html";
return;
}

loadGrades(uid);

});

}

function loadGrades(studentID){

db.collection("grades")
.where("studentID","==",studentID)
.get()
.then((snapshot)=>{

snapshot.forEach((doc)=>{

const grade = doc.data();

document.getElementById("grades").innerHTML +=
"<p>"+grade.assignmentID+" : "+grade.score+"</p>";

});

});

}

function logout(){
auth.signOut();
window.location.href="index.html";
}
