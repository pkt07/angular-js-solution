(function (){
 var app=angular.module('LunchCheck',[]);
 app.controller('LunchCheckController',checkForLunch);
 checkForLunch.$inject = ['$scope'];

 function checkForLunch($scope){

 	$scope.check = function(){
 		console.log("bdf");
 		if($scope.list==null || $scope.list=="")
 		{
 			$scope.message = "Please enter data first";
 			angular.element(document.querySelector('#ColorMsg')).removeClass('enjoy');
			angular.element(document.querySelector('#ColorMsg')).addClass('tooMuch');
 		}
 		else{
			var list = $scope.list.split(',');
			angular.element( document.querySelector('#ColorMsg') ).removeClass('tooMuch');
			angular.element( document.querySelector('#ColorMsg') ).addClass('enjoy');
			console.log(list);
			if(list.length <= 3){
				$scope.message = "Enjoy!";
				
			}
			else if(list.length > 3){
				$scope.message = "Too much!";
			}
			
		}
 	};
 }
})();
