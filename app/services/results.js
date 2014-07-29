'use strict';

/*Service that captures the book search result
  and can filter results
*/
angular.module('MyApp').factory('Results', function() {

	var allResults={
					'current':null,
					'prev':null,
					'next':null
		};

	return {
		//add results to allResults object
		addNewResults: function(results){

			allResults.current = results.splice(0,5);
			allResults.prev = null;
			allResults.next = results.splice((results.length/2),results.length);
		},

		//return current Results
		getCurrentResults: function(){
			return allResults.current;
		},

		/* returns next results if they exist
		otherwise returns null */
		getNextResults: function(){

			if (allResults.next !== null){
				this._update( allResults.next, allResults.current, null);
				return this.getCurrentResults();
			}else{
				return null;
			}
		},

		/* returns prev results if they exist
		   otherwise returns null */
		getPrevResults: function(){

			if (allResults.prev === null){
				return null;
			}else{
				this._update( allResults.prev, null, allResults.current);
				return this.getCurrentResults();
			}

		},

		/* helper function to update
		   current results, next results
		   and previous results
		*/
		_update: function(current, prev, next){
			allResults.current = current;
			allResults.prev = prev;
			allResults.next = next;
		}

	};
});