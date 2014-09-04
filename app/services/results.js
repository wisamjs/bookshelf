'use strict';

/*Service that captures the book search result
  and can filter results
*/
angular.module('MyApp').factory( 'Results', function() {

	var allResults = {
					'current':null,
					'prev':null,
					'next':null
		};

	/* helper function to update
	   current results, next results
	   and previous results
	*/
	var _update = function( current, prev, next ){
		allResults.current = current;
		allResults.prev = prev;
		allResults.next = next;
	};
	var service = {};

	//add results to allResults object
	service.addNewResults = function( results ) {

		allResults.current = results.splice(0,5);
		allResults.prev = null;
		allResults.next = results.splice( ( results.length / 2 ), results.length );
	};

	//return current Results
	service.getCurrentResults = function() {
			return allResults.current;
		};

	//return current Results
	service.getCurrentResults = function() {
		return allResults.current;
	};

		/* returns next results if they exist
		otherwise returns null */
	service.getNextResults = function() {

		if ( allResults.next !== null ) {
			_update( allResults.next, allResults.current, null );
			return service.getCurrentResults();
		}else {
			return null;
		}
	};

	/* returns prev results if they exist
	   otherwise returns null */
	service.getPrevResults = function() {

		if ( allResults.prev === null ) {
			return null;
		}else {
			_update( allResults.prev, null, allResults.current );
			return service.getCurrentResults();
		}

	};

	return service;
});