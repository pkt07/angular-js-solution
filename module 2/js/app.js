(function (){
 var app=angular.module('ShoopingList',[]);
 app.service('ShoppingListService',ShoppingListService);

 function ShoppingListService(){
 	var service = this;

	var toBuy = [
			{ name: "cookies", quantity: 10 },
			{ name: "icecream", quantity: 8 },
			{ name: "toffee", quantity: 6 },
			{ name: "chocklates", quantity: 4 },
			{ name: "candy", quantity: 2 }
	];

	var bought = [];

	service.addToBuy = function(iname,quantity){
		var item = {
			name:iname,
			quantity:quantity
		};
		toBuy.push(item);
	 };
	service.addToBought = function(index){
		var boughtItem = toBuy.splice(index,1);
		var newItem = {
			name: boughtItem[0].name,
			quantity: boughtItem[0].quantity
		};
		//console.log(newItem);
		bought.push(newItem);
	 };
	 service.getToBuy = function(){
		return toBuy;
	};
	service.getBought = function(){
		return bought;
	};
}

app.controller('ToBuyList',ToBuyList);
ToBuyList.$inject = ['$scope','ShoppingListService'];
function ToBuyList($scope,ShoppingListService){
	var toBuyList = this;

	toBuyList.items = ShoppingListService.getToBuy();

	toBuyList.itemName = "";
	toBuyList.quantity = "";

	toBuyList.addItem = function(){
		ShoppingListService.addToBuy(toBuyList.itemName,toBuyList.quantity);
	};
	toBuyList.addToBought = function(index){
		ShoppingListService.addToBought(index);
	};

};


app.controller('AlreadyBought',AlreadyBought);
AlreadyBought.$inject = ['$scope','ShoppingListService'];

function AlreadyBought($scope,ShoppingListService){
	var boughtList = this;
	boughtList.items = ShoppingListService.getBought();
};






})();
