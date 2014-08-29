'use strict';

angular.module('MyApp')
        .controller( 'FormController',
	function( $scope, $http, $log, Library, Results ) {

		var defaultForm = {
			name: '',
			author: '',
			genre: ''
		};



		$scope.submit = function( book ) {

			Library.addBook( book )

			.then(function() {
				//promise fulfilled
				//Add book and clear form
				$scope.books.push( book );
				$scope.newBookForm.$setPristine();
				$scope.book = angular.copy( defaultForm );
			})
            .then( null,$log.error );
        };

        $scope.search = function( bookTitle ) {
        	Library.searchBook( bookTitle )

        	.then(function( data ) {
                        $log.warn( 'Am I here' );
        		//Save results
        		Results.addNewResults( Library.parse( data ) );
        		$scope.results = Results.getCurrentResults();
        	})
                .then( null,$log.error );
        };

        //update results on page
        //probably needs to go somewhere else
        $scope.getPrevResults = function() {

        	var updatedResults = Results.getPrevResults();
        	//only update if a change needs to be made
        	if ( updatedResults ){
        		$scope.results = updatedResults;
        	}
        };

        //update results on page
        //probably needs to go somewhere else
        $scope.getNextResults = function() {

        	var updatedResults = Results.getNextResults();
        	//only update if a change needs to be made
        	if ( updatedResults ){
        		$scope.results = updatedResults;
        	}
        };

	});