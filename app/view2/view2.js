'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {




  
}])
function get() {
  var arrayOfRows = document.getElementById("ta").value.split("\n");
  var docfrag = document.createDocumentFragment();


//   var field = document.getElementById('ta1');
// var textArray = field.value.split("\n");
// textArray[0] += "Some text here"; // append some text to 4th line
// field.value = textArray.join("\n");
  
  var p = document.getElementById("ta1");
  while (p.firstChild) {
    p.removeChild(p.firstChild);
  }
  
  arrayOfRows.forEach(function(row, index, array) {
    console.log(array,row);

    
    var span = document.createElement("span");
    span.textContent = row;
    docfrag.appendChild(span);
    if(index < array.length - 1) {
      docfrag.appendChild(document.createElement("br"));
    }

    

  });

  p.appendChild(docfrag);
}