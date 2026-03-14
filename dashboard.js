auth.onAuthStateChanged((user)=>{

if(!user){
window.location.href="index.html";
return;
}

loadGrades(user.uid);

});

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
