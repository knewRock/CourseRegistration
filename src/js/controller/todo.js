angular.module('todoApp', ['ui.router'])
  .controller('TodoListController', function ($http) {
    var todoList = this
    todoList.todos = [
      {text: 'learn angular', done: true},
      {text: 'build an angular app', done: false}]

    todoList.addTodo = function () {
      console.log("aaaaa");
      data = {StudentID: "5610511111", Password: "1111", FirstName: "Nara", LastName: "Surawit" }
      $http.post('http://52.37.98.127:3000/v1/5610511111?pin=1111', data).success(function(a){
          //data : {StudentID: "5610511111", Password: "1111", FirstName: "Nara", LastName: "Surawit" }
          console.log("a");
        });
    }

    todoList.remaining = function () {
      var count = 0
      angular.forEach(todoList.todos, function (todo) {
        count += todo.done ? 0 : 1
      })
      return count
    }

    todoList.archive = function () {
      var oldTodos = todoList.todos
      todoList.todos = []
      angular.forEach(oldTodos, function (todo) {
        if (!todo.done) todoList.todos.push(todo)
      })
    }
  })

angular.module('filters',[])
  .filter('objFilter', function($filter){

    return function(input, query){
      if(!query) return input;
      var result = [];

      angular.forEach(input, function(v,k){
          result.push(v);          
      });

      var refined = $filter('filter')(result,query);

      return refined;
    };
  });
