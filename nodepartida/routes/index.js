var express = require('express');
var session=require("../session/django");
var s=session();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
var sesiones=Array();
router.get("/errorsession/",function(req,res){
	console.log("ERROR SESSION")
	res.writeHead("302",{"Location":"http://localhost:8000/ingresar/"});
	res.end();
});
router.get("/django/:id?",function(req,res){
	console.log(req.cookies.sessionid);
	s.getSession(req.params.id,function(s){
		if(s.estado=="conectado")
		{
			req.params.username=s.name;
			sesiones[req.cookies.sessionid]={id:req.params.id,name:s.name};
			console.log(sesiones);
			res.render('index', { title: 'Express',sessionid:req.params.id});
		}else{
			res.writeHead("302",{"Location":"http://localhost:8000/ingresar/"});
			res.end();
		}
	});
	
});
router.get("/chat/",function(req,res){
	console.log(req.cookies.sessionid);
	res.render('chat',{title:"Chat",username:sesiones[req.cookies.sessionid].name});

});
router.get("/saladechat",function(req,res){
	console.log(req.session);
	res.render("saladechat",{title:"Sala"});
});
router.get('/registrate/', function(req, res) {
  if(sesiones[req.cookies.sessionid]==undefined)
	{
		res.writeHead("302",{"Location":"http://localhost:8000/registrar/"});
		res.end();
		return;
	}
  res.render('registrate', { title: 'Express' });
});
router.get("/Login/",function(req,res){
	if(sesiones[req.cookies.sessionid]==undefined)
	{
		res.writeHead("302",{"Location":"http://localhost:8000/ingresar/"});
		res.end();
		return;
	}
	res.render("login",{})
});
router.get("/partidanueva/",function(req,res){
	if(sesiones[req.cookies.sessionid]==undefined)
	{
		res.writeHead("302",{"Location":"http://localhost:8000/crearpartida/"});
		res.end();
		return;
	}
  res.render('partidanueva', { title: 'Express' });
});

module.exports = router;