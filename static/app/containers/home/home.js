angular.module('App')
.component('homeComp', {
  templateUrl: 'app/containers/home/home.html',
  controller: HomeCompCtrl,
  controllerAs: 'homeComp'
});

function HomeCompCtrl($http, $location, Auth, UserService) {
  var homeComp = this;
  homeComp.searchTerm = '';
  homeComp.userInput = '';
  homeComp.results = undefined;
  homeComp.dict = {};
  homeComp.maxIngredients = 10;
  homeComp.minIngredients = 0;
  homeComp.allergy = '';
  // homeComp.dietaryRestrictions = 'vegan';
  // var advSearchForm = (angular.element(document.getElementById('advancedSearch-form"')));
  // homeComp.$watch('homeComp.searchTerm', function(newVal, oldVal) {
  //   homeComp.search();
  // });

  homeComp.multipleAdvancedSearchTerms = function() {
    console.log('homeComp.userInput ', homeComp.userInput );
    homeComp.searchTerm = '';
    console.log('homeComp.searchTerm: ', homeComp.searchTerm);
    for (key in homeComp.dict) {
      if(homeComp.dict[key]) {
        homeComp.searchTerm += [key] + ', ';
      }
    }
    if(homeComp.userInput) {
      homeComp.searchTerm += homeComp.userInput + ', ';
    }
    console.log('homeComp.searchTerm: ', homeComp.searchTerm);
    homeComp.search(homeComp.allergy);
    // var formData = $("#advancedSearch-form").serialize();
    // console.log("formData:", formData);
    // homeComp.splittingFormData(formData);
  }

  // homeComp.splittingFormData = function(obj) {
  //   console.log('splittingformdatainput: ', obj);
  //   var string = '';
  //   while(obj.split('=true&')) {
  //     sting += obj.split('=true&')[0] + ', ';
  //     console.log('obj: ', obj);
  //   }
  //   if(obj.split('=true')) {
  //     sting += obj.split('=true')[0];
  //   }
  //   homeComp.searchTerm = string;
  //   homeComp.search();
  // }

  homeComp.search = function(obj) {
    console.log(obj);
    if(obj == '') {
      var req = {
        url: 'https://api.edamam.com/search?q='+homeComp.searchTerm+'&app_id=c8ceed5f&app_key=bbfa5375222109bd6452b480ab860eaa&from=0&to='+homeComp.maxIngredients+'',
        method: "GET",
      }
    }
    else {
      var req = {
        url: 'https://api.edamam.com/search?q='+homeComp.searchTerm+'&app_id=c8ceed5f&app_key=bbfa5375222109bd6452b480ab860eaa&from=0&to='+homeComp.maxIngredients+'&health='+homeComp.allergy+'',
        method: "GET",
      }
    }

    $http(req).then(function success(res) {
      console.log('max ingredients: ',homeComp.maxIngredients);
      console.log('search term: ', homeComp.searchTerm);
      console.log('homeComp.allergy: ', homeComp.allergy);
      console.log("HTTP success:", res);
      if (res.data.Error === "Not found!") {
        homeComp.results = [];
      } else {
        homeComp.results = res.data.hits;
        console.log(homeComp.results);
      }
    }, function failure(res) {
      homeComp.results = [];
      console.log("HTTP failed:", res);
    });
  }
}

HomeCompCtrl.$inject = ['$http', '$location', 'Auth', 'UserService'];
