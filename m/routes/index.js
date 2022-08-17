const usersRoutes=require('./users')

module.exports=(app)=>{
    app.use('/users',usersRoutes)
    app.use('*',(req,res)=>{
        res.redirect('/users/login')
    })
}