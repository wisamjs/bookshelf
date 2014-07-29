'use strict';

myApp.controller('FormController',
	['$scope','$http', 'Library', 'Results', function($scope ,$http , Library, Results){

		var defaultForm = {
			name: '',
			author: '',
			genre: ''
		};



		$scope.submit = function(book){

			Library.addBook(book)

			.then(function(){
				//promise fulfilled
				//Add book and clear form
				$scope.books.push(book);
				$scope.newBookForm.$setPristine();
				$scope.book = angular.copy(defaultForm);
			},

			function(error){
				//promise rejected
				console.log('error' + error);
			});
        };

        $scope.search = function(bookTitle){
        	Library.searchBook(bookTitle)

        	.then( function(data){

        		//Save results
        		Results.addNewResults(Library.parse(data));
        		$scope.results= Results.getCurrentResults();
        	},

        	function(error){
        		console.log(error);
        	});
        };

        //update results on page
        //probably needs to go somewhere else
        $scope.getPrevResults = function(){

        	var updatedResults;
        	//only update if a change needs to be made
        	if ( updatedResults = Results.getPrevResults()){
        		$scope.results = updatedResults;
        	}
        }

        //update results on page
        //probably needs to go somewhere else
        $scope.getNextResults = function(){

        	var updatedResults;
        	//only update if a change needs to be made
        	if ( updatedResults = Results.getNextResults()){
        		$scope.results = updatedResults;
        	}
        };

	}]);