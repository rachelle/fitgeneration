(function() {
  'use strict';

  angular
    .module('fitgeneration')
    .factory('DataService', DataService);

  function DataService() {
    return {
      todoId: 5,
      todoList: [
        {id: 1, task: "Build an awesome todo app.", complete: false},
        {id: 2, task: "Get super good at Angular.", complete: true},
        {id: 3, task: "Party on code.",             complete: false},
        {id: 4, task: "Take a nap.",                complete: false}
      ]
    };
  }

})();