app.controller('CadastroCtrl', ['$scope', '$http', '$q', function($scope, $http, $q) {

  	$scope.tagArray;

  	$scope.tagsComplete = [{ text : "Adoção"}, {text : "Em recuperação"}, {text : "Urgente"}];

  	$scope.typeArray = [{ name: "Cachorro", value: "cachorro"}, { name: "Gato", value: "gato"}];

  	$scope.selectedType = $scope.typeArray[0].value;

  	$scope.loadTags = function() {
  		var deferred = $q.defer();
        deferred.resolve($scope.tagsComplete);
        return deferred.promise;
  	}
  		
  	$scope.cadastrar = function() {

		var date = new Date();
	  	
	  	var nome = $scope.nome;
	  	var descricao = $scope.descricao;

	  	var local = $scope.location.split(",");

	  	var localizacao = [{
	  		local: local[0],
	  		latitude: local[1],
	  		longitude: local[2],
	  		data: date
	  	}];

	  	var tipo = $scope.selectedType;
	  	var tags = $scope.tagArray;

	  	var eventos = [{
	  		usuario_nome: "Maria Joaquina",
	  		texto: "Cadastrado por Maria Joaquina",
	  		data: date
	  	}];

	  	var animal = {
	  		nome: nome,
	  		descricao: descricao,
	  		localizacoes: localizacao,
	  		tags: tags,
	  		tipo: tipo,
	  		eventos: eventos
	  	}

	  	console.log($scope.tagArray);
	  	console.log(localizacao);
	  	console.log(local);
	  	if (local[0].substring(0, 2) == "R." || local[0].substring(0,3) == "Av.")
	  		console.log("detectado");

	  	console.log();

	  	$http.post('/api/animal', animal)
			.success(function(response) {
				console.log(response.data);
				window.location = '/';
			});
	}

}]).directive('googlePlaces', function(){
	    return {
	        restrict:'E',
	        replace:true,
	        // transclude:true,
	        scope: {location:'='},
	        template: '<input id="google_places_ac" name="google_places_ac" type="text" class="form-control" placeholder="Endereço" />',
	        link: function($scope, elm, attrs){
	            var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
	            google.maps.event.addListener(autocomplete, 'place_changed', function() {
	                var place = autocomplete.getPlace();
	                $scope.location = place.name + ',' + place.geometry.location.lat() + ',' + place.geometry.location.lng();
	                $scope.$apply();
	            });
	        }
	    }
	});