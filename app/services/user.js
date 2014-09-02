'use strict';

angular.module('MyApp')
	.factory('User', function( $http, $log, $q ) {
		return {
			login: function( user ) {


	    		return $http.post( '/login',
	    		{
	    			email: user.email,
	    			password: user.password

	    		});
	    	},

	    	signup: function( user ) {
	    		return $http.post( '/signup',
	    		{
	    			email : user.email,
	    			password: user.password
	    		});
	    	},
	    };

		});