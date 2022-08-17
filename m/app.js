const express=require('express')
const app=express()
const static=express.static(__dirname+'/public')
const session=require('express-session')
const routes=require('./routes')
const exphbs=require('express-handlebars')

app.use
app.use('/public',static)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(rewriteUnsupportedBrowserMethods)

app.engine('handlebars',exphbs.engine({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(session({
    name:'AuthCookie',
    secret:"some secret string!",
    resave:false,
    saveUninitialized:true,
}))

app.use(async(req,res,next)=>{
	let r=''
	const currentTimestamp=new Date().toUTCString()
	const  requestMethod=req.method
	const requestRoute=req.originalUrl
	r=currentTimestamp+'\t' +requestMethod+'\t'+requestRoute+'\t'
	if(req.session.user)
	{
		r=r+'is authenticated'
	}
	else
	{
		r=r+'is not authenticated'
	}
	console.log(r)
	next()
})

routes(app)

app.listen(3000,function(){
	console.log("We've now got a server!")
	console.log('Your routes will be running on http://localhost:3000/')
})
// npm init -y
// "start":"node app.js"
// "dependencies": {
//     "axios": "^0.27.2",
//     "bluebird": "^3.7.2",
//     "express": "^4.17.2",
//     "fs": "^0.0.1-security",
//     "mongodb": "^4.3.1",
//     "prompt": "^1.3.0",
//     "uuid": "^3.4.0"
//   }