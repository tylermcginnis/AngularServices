var app = angular.module('myApp', []);

/*---------SERVICE EXAMPLE--------*/
app.controller('myServiceCtrl', function($scope, myService){
  $scope.data = {};
  $scope.updateArtist = function(){
    myService.setArtist($scope.data.artist);
  };

  $scope.submitArtist = function(){
    myService.callItunes()
      .then(function(data){
        $scope.data.artistData = data;
      }, function(data){
        alert(data);
      })
  }
});

app.service('myService', function($http, $q){
  var baseUrl = 'https://itunes.apple.com/search?term=';
  var _artist = '';
  var _finalUrl = '';

  var makeUrl = function(){
    _artist = _artist.split(' ').join('+');
    _finalUrl = baseUrl + _artist + '&callback=JSON_CALLBACK'
    return _finalUrl;
  }

  this.setArtist = function(artist){
    _artist = artist;
  }

  this.getArtist = function(){
    return _artist;
  }

  this.callItunes = function(){
    makeUrl();
    var deferred = $q.defer();
    $http({
      method: 'JSONP',
      url: _finalUrl
    }).success(function(data){
      deferred.resolve(data);
    }).error(function(){
      deferred.reject('There was an error')
    })
    return deferred.promise;
  }

});
/*---------END SERVICE EXAMPLE--------*/



/*---------FACTORY EXAMPLE--------*/
app.controller('myFactoryCtrl', function($scope, myFactory){
  $scope.data = {};
  $scope.updateArtist = function(){
    myFactory.setArtist($scope.data.artist);
  };

  $scope.submitArtist = function(){
    myFactory.callItunes()
      .then(function(data){
        $scope.data.artistData = data;
      }, function(data){
        alert(data);
      })
  }
});

app.factory('myFactory', function($http, $q){
  var service = {};
  var baseUrl = 'https://itunes.apple.com/search?term=';
  var _artist = '';
  var _finalUrl = '';

  var makeUrl = function(){
    _artist = _artist.split(' ').join('+');
    _finalUrl = baseUrl + _artist + '&callback=JSON_CALLBACK'
    return _finalUrl;
  }

  service.setArtist = function(artist){
    _artist = artist;
  }

  service.getArtist = function(){
    return _artist;
  }

  service.callItunes = function(){
    makeUrl();
    var deferred = $q.defer();
    $http({
      method: 'JSONP',
      url: _finalUrl
    }).success(function(data){
      deferred.resolve(data);
    }).error(function(){
      deferred.reject('There was an error')
    })
    return deferred.promise;
  }

  return service;
});
/*---------END FACTORY EXAMPLE--------*/



/*---------PROVIDER EXAMPLE--------*/
app.controller('myProviderCtrl', function($scope, myProvider){
  $scope.data = {};
  $scope.updateArtist = function(){
    myProvider.setArtist($scope.data.artist);
  };

  $scope.submitArtist = function(){
    myProvider.callItunes()
      .then(function(data){
        $scope.data.artistData = data;
      }, function(data){
        alert(data);
      })
  }

  $scope.data.thingFromConfig = myProvider.thingOnConfig;
});

app.provider('myProvider', function(){
  var baseUrl = 'https://itunes.apple.com/search?term=';
  var _artist = '';
  var _finalUrl = '';

  //Going to set this property on the config function below
  this.thingFromConfig = '';

  var makeUrl = function(){
    _artist = _artist.split(' ').join('+');
    _finalUrl = baseUrl + _artist + '&callback=JSON_CALLBACK'
    return _finalUrl;
  }

  this.$get = function($http, $q){
    return {
      callItunes: function(){
        makeUrl();
        var deferred = $q.defer();
        $http({
          method: 'JSONP',
          url: _finalUrl
        }).success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject('There was an error')
        })
        return deferred.promise;
      },
      setArtist: function(artist){
        _artist = artist;
      },
      getArtist: function(){
        return _artist;
      },
      thingOnConfig: this.thingFromConfig
    }
  }
});

app.config(function(myProviderProvider){
  //Providers are the only service you can pass into app.config
  myProviderProvider.thingFromConfig = 'This sentence was set in app.config. Providers are the only service that can be passed into config. Check out the code to see how it works';
});
