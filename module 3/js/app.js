(function (){
 var app=angular.module('NarrowItDownApp',[]);
 
app.service('MenuSearchService',['$http','$q',MenuSearchService]);
function MenuSearchService($http,$q){
var service = this;
service.getMatchedMenuItems = function(searchItem){
	var filtered = [];
	var q = $q.defer();
	if(service.allItems){
		filtered = filterItem(searchItem);
		q.resolve(filtered);
	}
	else {
		$http({
              method:"GET",
              url: "https://davids-restaurant.herokuapp.com/menu_items.json"
          }).then((resp)=>{
              //load data into service holder
              service.allItems = resp.data.menu_items;
              //filter it
              filtered = filterItem(searchItem);
              //RETURN VALUE
              //return filtered;
              q.resolve(filtered);
          }).catch((err)=>{
              //error here
              console.error(err);
              //return empty array
              //return [];
              q.reject(err);
          });
    };
    return q.promise;
  };


  function filterItem(searchItem){
    var filtered = [];
    console.log(searchItem);
    filtered = service.allItems.filter((item)=>{
      return item.description.indexOf(searchItem.toLowerCase()) > -1;
    });
    return filtered;
  };
};

app.controller('NarrowItDownController',menuCheck);
menuCheck.$inject = ['$scope','$http','$q','MenuSearchService'];
function menuCheck($scope,$http,$q,MenuSearchService){
  var ctrl = this;
  ctrl.searchItem = "";
  ctrl.showCount = false;
  ctrl.getMatchedMenuItems = function() {
    console.log("Fetching Items...");
    if(ctrl.searchItem == ""){
      ctrl.found = [];
    }
    else{
      MenuSearchService.getMatchedMenuItems(ctrl.searchItem)
      .then((data) => {
        ctrl.found = data;
      }).catch((err)=>{
        ctrl.found=[];
        console.log(err);
      });
    }
    ctrl.showCount = true;
  }

  ctrl.removeItem = function(itemId){
    if(ctrl.found.length > 0){
      ctrl.found.splice(itemId,1);
      console.log("removeItem",itemId);
    }
  }
}

app.directive('foundItems',[foundItems]);
function foundItems(){
    var dir = {
        scope:{
            menuItems:'<',
            onRemove:'&'
        },
        template:`
            <table class="table table-striped">
                <tr data-ng-repeat="item in ctrl.menuItems">
                    <td>{{item.short_name}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.description}}</td>
                    <td style="text-align:right;">
                        <button
                            data-ng-click="ctrl.removeItem($index)"
                            class="btn"
                            title="Don't want thisone"
                        ><i class="glyphicon glyphicon-remove"></i></button>
                    </td>
                </tr>
            </table>
        `,
        controller:foundItemsDirCtrl,
        //bind controller function to local
        controllerAs:'ctrl',
        bindToController:true
    };

    return dir;
};
function foundItemsDirCtrl(){
    let ctrl=this;

    //define removeItem function call
    ctrl.removeItem = function(itemId){

        console.log("Remove item...",itemId);
        //call linked function on parent contoller
        //to remove id from found array on controllers scope
        ctrl.onRemove({
            id:itemId
        })
    }
};



})();