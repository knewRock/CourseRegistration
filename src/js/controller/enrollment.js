angular.module('todoApp', ['ui.router'])
  .controller('enrollmentController', function ($http, $scope, enrollservice, $rootScope) {
    var enrollmentList = this;
    // $scope.isLogin = false;
    $scope.courses = [];
    $scope.courseID = [];
    $scope.sections = {};
    $scope.sections2 =[];
    $scope.addedCourse = [];
    $scope.addedCoursejson = [];
    $scope.filejson = {};

    // $scope.showIncorrect = false;
    // todoList.todos = [
    //   {text: 'learn angular', done: true},
    //   {text: 'build an angular app', done: false}]

    this.addTodo = function () {
      data = {StudentID: "5610511111", FirstName: "Nara", LastName: "Surawit" }
      $http.post('http://52.37.98.127:3000/v1/5610511111?pin=1111', data).success(function(a){
          //data : {StudentID: "5610511111", Password: "1111", FirstName: "Nara", LastName: "Surawit" }

        });
    }

    enrollmentList.getCourse = function (){
      $http.get('https://whsatku.github.io/skecourses/combined.json').success(function(data){
        $scope.courses = data;
        angular.forEach(data, function (aCourse) {
          enrollmentList.getSection(aCourse.id);
          // $scope.courseID.push(aSection.id);
        });
      });
    }
    enrollmentList.getCourse();

    enrollmentList.getSection = function (courseID){
      $http.get('https://whsatku.github.io/skecourses/sections/'+ courseID +'.json')
      .success(function(data){
        $scope.sections[courseID] = data;
        // console.log($scope.sections);
      });
    }

    $scope.getSection2 = function (courseID){
      $http.get('https://whsatku.github.io/skecourses/sections/'+ courseID +'.json')
      .success(function(data){
        $scope.sections2 =data;
        // console.log($scope.sections);
      });
    }

    $scope.getJson = function (){
      $scope.addedCourse = enrollservice.get();
      $scope.filejson["StudentID"] = "5610511111";
      $scope.filejson["FirstName"] = "Nara";
      $scope.filejson["LastName"] = "Surawit";
      $scope.filejson["courses"] = $scope.addedCourse;
      // $scope.addedCourse = enrollservice.get();
      // console.log($scope.addedCourse);
      // $scope.addedCoursejson = $scope.addedCourse.slice(0);
      // console.log($scope.addedCoursejson);
      $scope.filejson = JSON.stringify($scope.filejson, undefined, 2);
    }

    $scope.saveToServer = function (){
      $scope.addedCourse = enrollservice.get();
      $scope.filejson["StudentID"] = "5610511111";
      $scope.filejson["FirstName"] = "Nara";
      $scope.filejson["LastName"] = "Surawit";
      $scope.filejson["courses"] = $scope.addedCourse;

      // $scope.addedCourse = enrollservice.get();
      // console.log($scope.addedCourse);
      // $scope.addedCoursejson = $scope.addedCourse.slice(0);
      // console.log($scope.addedCoursejson);
      $http.post('http://52.37.98.127:3000/v1/5610511111?pin=1111', $scope.filejson).success(function(a){
          //data : {StudentID: "5610511111", Password: "1111", FirstName: "Nara", LastName: "Surawit" }

      });
    }    

    $scope.loginStudentID = function (email, password){
      // if(email != undefined && password != undefined){
      //   $scope.isLogin = true;
      // }
      // console.log($scope.isLogin);
      var a = enrollservice.loginStudentID(email, password);
      // $scope.isLogin = enrollservice.getIsLogin();
      // $scope.showIncorrect = false
      
      console.log($rootScope.isLogin);
    }

    $scope.logoutStudentID = function (){
      // if(email != undefined && password != undefined){
      //   $scope.isLogin = true;
      // }
      // console.log($scope.isLogin);
      enrollservice.logoutStudentID();
    }

    $scope.getIsLogin = function (){
      // if(email != undefined && password != undefined){
      //   $scope.isLogin = true;
      // }
      // console.log($scope.isLogin);
      return enrollservice.getIsLogin();
    }

    $scope.saveToPc = function () {

      if (!$scope.filejson) {
        console.error('No data');
        return;
      }
      // if (typeof filejson === 'object') {
      //   filejson = JSON.stringify(data, undefined, 2);
      // }

      var blob = new Blob([$scope.filejson], {type: 'text/json'}),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a');

      a.download = 'download.json';
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window,
          0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    };

    $scope.addCourse = function (aCourse, aSection){
      if($scope.getTotal()+aCourse.credit.total <= 22){
        aCourse["section"] = aSection;
        aCourse["creditType"] = "Credit";
        // console.log(aCourse);
        $scope.addedCourse.push(aCourse);

        enrollservice.set($scope.addedCourse);
        console.log($scope.addedCourse);

         $scope.saveToServer();

      }
      else{
      $.notify({
  // options
        icon: 'glyphicon glyphicon-warning-sign',
        title: 'Warning',
        message: 'Your total Credits reach to the limit(Maxmum is 22).',
        // url: 'https://github.com/mouse0270/bootstrap-notify',
        target: '_blank'
      },{
        // settings
        element: 'body',
        position: null,
        type: "danger",
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
          from: "top",
          align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 500,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
          '<span data-notify="icon"></span> ' +
          '<span data-notify="title">{1}</span> ' +
          '<div data-notify="message">{2}</div>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>' 
      });
    }
      // console.log($scope.addedCourse);
    }

    $scope.dropCourse = function (aCourse, aSection){
      // aCourse["section"] = aSection;
      var index = $scope.addedCourse.indexOf(aCourse);
      $scope.addedCourse.splice(index, 1);
      enrollservice.set($scope.addedCourse); 
      // aCourse["section"] = aSection;
      // $scope.addedCourse.push(aCourse);

      console.log($scope.addedCourse);
    }

    $scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < $scope.addedCourse.length; i++){
        var aCourse = $scope.addedCourse[i];
        total += aCourse.credit.total;
    }
    return total;
     }


  // $.notify({
  // // options
  //   message: 'Hello World' 
  // },{
  // // settings
  //   type: 'danger'
  // });




    
  })
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
  })

  .service('enrollservice', function($http, $state, $rootScope) {
    var enroll =[];
    var enrollJson = {};
    $rootScope.isLogin = false;
    $rootScope.showIncorrect =false;

    this.set = function(obj){
      enroll = obj;
    }
    this.get = function(){
      return enroll;
    }

    this.getIsLogin = function(){
      return $rootScope.isLogin;
    }

    this.getShowIncorrect = function(){
      return $rootScope.showIncorrect;
    }

    this.getJson = function (){
      // filejson["StudentID"] = "5610511111";
      // filejson["courses"] = $scope.addedCourse;
      // $scope.addedCourse = enrollservice.get();
      // console.log($scope.addedCourse);
      // $scope.addedCoursejson = $scope.addedCourse.slice(0);
      // console.log($scope.addedCoursejson);
      enrollJson = JSON.stringify(enroll.slice(0), undefined, 2);
    }

    this.saveToPc = function () {

      if (!enrollJson) {
        console.error('No data');
        return;
      }
      // if (typeof filejson === 'object') {
      //   filejson = JSON.stringify(data, undefined, 2);
      // }

      var blob = new Blob([enrollJson], {type: 'text/json'}),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a');

        a.download = 'download.json';
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initEvent('click', true, false, window,
            0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
      };

      this.loginStudentID = function (studentID, password) {
        console.log('aaaaaaaaaaaaaaaaaaaaa');
        return $http.get('http://52.37.98.127:3000/v1/'+studentID+'?pin='+ password).then(function successCallback(response) {
          console.log('bbbbbbbbbbbbbbbbbbb');
          // this callback will be called asynchronously
          // when the response is available

          $rootScope.isLogin = true;
          enrollJson = response;
          $state.transitionTo('enrollment');

        }, function errorCallback(response) {
          console.log('cccccccccccccccccccc');
          $rootScope.showIncorrect = true;

          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });
        
      }


      this.logoutStudentID = function () {
        $rootScope.isLogin = false;
        $state.transitionTo('login');
        console.log("logout");
      }

});




  // $(document).ready(function () {
  //     (function ($) {
  //       $('#filter').keyup(function () {
  //         var rex = new RegExp($(this).val(), 'i');
  //         $('.searchable tr').hide();
  //         $('.searchable tr').filter(function () {
  //            return rex.test($(this).text());
  //         }).show();
  //       })
  //     }(jQuery));
  //   });


