/**
 * @author Adriana Guzman - amarcela.guzman@udea.edu.co
 * @since Java 1.8
 * @version 1.0
 * 
 * Clase servicio.js 
 * 
 */

var appClientes = angular.module('Clientes',['ngRoute', 'ngCookies']);

var URL_SERVICIO_VALIDAR_USUARIO = 'http://localhost:8080/ServicioWeb-XYZ/rest/Usuario/Validar/';
var URL_SERVICIO_LISTA = 'http://localhost:8080/ServicioWeb-XYZ/rest/Clientes/ListaClientes';
var URL_SERVICIO_GUARDAR = 'http://localhost:8080/ServicioWeb-XYZ/rest/Clientes';
var URL_SERVICIO_CREAR_USUARIO = 'http://localhost:8080/ServicioWeb-XYZ/rest/Usuario';
var URL_SERVICIO_BUSCAR_USUARIO = 'http://localhost:8080/ServicioWeb-XYZ/rest/Usuario/BuscarUsuario/';
var URL_SERVICIO_CREAR_PETICION = 'http://localhost:8080/ServicioWeb-XYZ/rest/Peticion/Crear';
var URL_SERVICIO_LISTA_PETICIONES = 'http://localhost:8080/ServicioWeb-XYZ/rest/Peticion/ListaPeticiones';
var URL_SERVICIO_BUSCAR_CLIENTE = 'http://localhost:8080/ServicioWeb-XYZ/rest/Clientes/BuscaCliente';

/**
 * Autenticacion 
 */
appClientes.factory('auth', function($cookies, $location){

	
	return{
		login : function(usuario, rol){
			//se crea los cookies
			$cookies.nombreUsuario = usuario
			/*se manda a la lista de clientes*/
			if (rol == 'USR'){
				$location.url('/crearPeticion');	
				
			}else{
				$location.url('/consultarPeticiones');
			}
			
		},
		validarEstado : function(){
			if(typeof($cookies.nombreUsuario) == 'undefined'){
				$location.url('/');
			}
			/*Si intenta acceder al login pero ya había iniciado sesion 
			 * se envía a la lista de clientes*/
			if(typeof($cookies.nombreUsuario) != 'undefined' && $location.url() == '/'){
				//$location.url('/listaClientes');
				
			}
		},

	};
});

/**Servicio usuarios 
 * */
appClientes.service('Usuarios', function($cookies, $http){
	/*Llama al servicio web para validar el usuario y la contraseña*/	
	this.validar = function(usuario, contrasena){
		return $http({
			/*Pongo GET porque el servicio responde a GET*/
			method : 'GET',
			url : URL_SERVICIO_VALIDAR_USUARIO + usuario + '/' + contrasena, 

			});
		
	};
	
	this.crear = function(usuario){
		return $http({
			
			method : 'POST',
			url : URL_SERVICIO_CREAR_USUARIO,
				params : {
					login : usuario.login,
					clave : usuario.clave,
					nombres : usuario.nombres,
					apellidos : usuario.apellidos,
					rol : "USR"
					
				}
		});
	};
	
	this.rolUsuario = function(usuario){
		return $http({
			method : 'GET',
			url : URL_SERVICIO_BUSCAR_USUARIO + usuario,

		});
	};
	
});

/**Servicio peticiones y clientes
 * */
appClientes.service('Peticiones', function($http){

	this.peticion = function(peticiones, codigoIncremental, fechaCreacion){
		return $http({
		
			method : 'GET',
				url : URL_SERVICIO_CREAR_PETICION  + '/' + codigoIncremental + '/' + peticiones.cliente + '/' + peticiones.texto + '/' + fechaCreacion,
					
			});
		};
		
		
	this.listaPeticiones = function(){
		return $http({
			
			method : 'GET',
			url : URL_SERVICIO_LISTA_PETICIONES 
		});
	};
	
		
	this.buscarCliente = function(peticiones){
		return $http({
			
			method : 'GET',
			url : URL_SERVICIO_BUSCAR_CLIENTE + '/' + peticiones.cliente,
		});
	};
	
	
});

/**
 * Enrutamiento
 */
appClientes.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl : 'login.html',	
		controller : 'contLogin'		
	});

	$routeProvider.when('/consultarPeticiones', {
		templateUrl : 'consultarPeticiones.html',
		/*Cuando se carga la raiz del
		 *aplicativo, se cartga en la vista la lista de clientes*/
		controller : 'contPeticiones'
	});

	$routeProvider.when('/crearPeticion', {
		templateUrl : 'crearPeticion.html',
		/* Cuando se quiere agregar un cliente se muestra el
		 * formulario para agregar un cliente */
		controller : 'contPeticion'
	});
	
	$routeProvider.when('/crearUsuario', {
		templateUrl : 'crearUsuario.html',
		controller : 'contCrearUsuario'
	});
	
	$routeProvider.when('/resolverPeticion', {
		templateUrl : 'resolverPeticion.html',
		controller : 'contPeticiones'
	});

}]);


// Controlador formulario de autenticación
appClientes.controller ('contLogin', function($scope, $location, auth, Usuarios){
	/*La funcion login que llamamos en la vista llama a  la funcion
	 * login de la factoría auth pasando al que contiene el campo
	 * de texto del formulario*/
	$scope.login = function(){
		
		
		Usuarios.validar($scope.nombreUsuario, $scope.pws).success(function(data){
			if(data != ''){
				alert(data);
				$scope.nombreUsuario = '';
				$scope.pws = '';
				return;
			}else{
				rol = '';
				Usuarios.rolUsuario($scope.nombreUsuario).success(function(data){
					alert("Usuario con rol: " + data);
					rol = data;
					auth.login($scope.nombreUsuario, rol);
				})
			}
		});
	};
	
	$scope.registrar = function(){
		$location.url('/crearUsuario');

	};
	
});

//CONTROLADOR crear usuarios
appClientes.controller ('contCrearUsuario', function($scope, $location, auth, Usuarios){

	$scope.usuario = {
			login : '',
			clave : '',
			nombre : '',	
			apellidos : '',
			rol : 'USR',

	};

	$scope.crear = function(){
		Usuarios.crear($scope.usuario).success(function(data){
			alert("Usuario creado con Exito");
			$location.url('/');
		});

	};

});

//Controlador lista de clientes
appClientes.controller('contPeticiones', function($scope, $location, $route, Peticion){

	Peticion.listaPeticiones().success(function(data){

		$scope.peticiones = data.peticiones;

	});
	
	$scope.enviarCorreo = function(peticiones) {
		
		Peticion.buscarCliente(peticiones).success(function(data){

			var link = "mailto:"+ data
		             + "?subject=Respuesta%20de%20Solicitud " + peticiones.codigo + " para el cliente: " + peticiones.cliente
 	             + "&body=La%20respuesta%20a%20su%20solicitud:%20" + escape(peticiones.texto); 

		    window.location.href = link;

		});
	};
		
	
	
});

//controlador crear cliente
appClientes.controller('contPeticion', function($scope, $location, $cookies, Peticion){
	
	Peticion.listaPeticion().success(function(data){
		
		codigoIncremental = Object.keys(data.peticiones).length + 1;
		fechaCreacion = new Date();

	});
	
	$scope.peticiones = {
			cliente : '',
			texto : '',				
			
			
	};

	$scope.crearPeticion = function(){
		Peticion.peticion($scope.peticiones, codigoIncremental, fechaCreacion).success(function(data){
			if (data == ''){
				alert("Su peticion ha sido registrada,se enviara una respuesta a su correo electronico.");
				$location.url('/');
			}else{
				alert(data);
				$scope.peticiones = '';
			}
		});

	};
});

//EJECUCIÓN INICIAL
appClientes.run(function($rootScope,auth)
		{
		/*Se ejecuta cada vez que cambia la ruta*/
		$rootScope.$on("$routeChangeStart", function(){
			check = 0;
			/*Llamos a checkstatus, el cual lo hemos definido en la factoria de auth
			 * la cual hemos injectado en la accion run de la app*/
			if (check != 0){
				auth.validarEstado();
				check = 1;
			}
		});
	});