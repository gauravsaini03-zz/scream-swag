angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, MediaSrv, $cordovaMedia, $timeout, $cordovaGeolocation, $injector,$ionicPopup) {
	
	$scope.scream = function(){
		MediaSrv.loadMedia('img/scream.mp3').then(function(media){
		  media.play();
		  $timeout(function () {
			  media.stop();
		    }, 10000);
		});
	}
	
	$scope.sendsms = function(){
		var number = localStorage.getItem("number");
		var message = "I am in problem. Please help";
		var intent = "INTENT"; //leave empty for sending sms using default intent
        var success = function () { alert('Message sent successfully'); };
        var error = function (e) { alert('Message Failed:' + e); };
        if(number){
        	sms.send(number, message, intent, success, error);
        }else{
        	var alertPopup = $ionicPopup.alert({
  				title: 'Error !',
  				template: "Please enter Emergency number in setting"
  			});
        }
	}
	
	$scope.call =function(){
		window.open('tel:100', '_system')
	}
	$scope.sharelocation = function(){
		$injector.get("$ionicLoading").show();
		$cordovaGeolocation.getCurrentPosition().then(function(position) {
  			var number = localStorage.getItem("number");
  			var message = "I am in problem. Please help. My Location latitude: " + position.coords.latitude + "longitude: " + position.coords.longitude;
  			var intent = "INTENT";
  	        var success = function () { 
  	        	var alertPopup = $ionicPopup.alert({
  	  				title: 'Error !',
  	  				template: "Shared Location and sent SMS"
  	  			});
  	        	$injector.get("$ionicLoading").hide();
  	        };
  	        var error = function (e) { alert('Message Failed:' + e); };
	  	    if(number){
	          	sms.send(number, message, intent, success, error);
	          }else{
	          	var alertPopup = $ionicPopup.alert({
    				title: 'Error !',
    				template: "Please enter Emergency number in setting"
    			});
	        }
  			$injector.get("$ionicLoading").hide();
  	    }, function(err) {
  	    	var alertPopup = $ionicPopup.alert({
  				title: 'Error !',
  				template: "Geolocation not Found"
  			});
  	    	$injector.get("$ionicLoading").hide();
  	    });
		$timeout(function () {
			$injector.get("$ionicLoading").hide();
			var alertPopup = $ionicPopup.alert({
  				title: 'Error !',
  				template: "Geolocation not Found. Please try again later"
  			});
		}, 30000);
	}
})

.controller('AboutCtrl', function($scope) {
})

.controller('SettingCtrl', function($scope, $ionicPopup, $injector) {
	$scope.number = {};
	$scope.save = function(){
		$injector.get("$ionicLoading").show();
		localStorage.setItem("number", $scope.number.num);
		$injector.get("$ionicLoading").hide();
		var alertPopup = $ionicPopup.alert({
			title: 'Error !',
			template: "Number saved"
		});
		
	}
	
});
