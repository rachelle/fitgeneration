$(document).ready(function() { 

function shuffle(plans) {

var newPlan = [];

  var plans = [
    { name: "lunges", sets: 4, reps: 25 },
    { name: "squats", sets: 4, reps: 20 }, 
    { name: "sumo squats", sets: 4, reps: 30}, 
    { name: "deadlifts", sets: 5, reps: 15},
    { name: "jumpsquats", sets: 4, reps: 12}, 
  ];

    plans.forEach(function(plan){
    
      newPlan[Math.floor(Math.random() * plans.length));
    
 $('.randomPlan').append(array);

 };


}):
