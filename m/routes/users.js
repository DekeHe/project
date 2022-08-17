// const users=require('./u')

const express=require('express')

const data=require('../data')
const users=data.users

const router=express.Router()

router.get(/*users*/'/login',(req,res)=>{
    if(req.session.user)
    {
        res.redirect('/users/private')
    }
    else
    {
        res.render('users/login')
    }
})

router.get(/*users*/'/signup',(req,res)=>{
    if(req.session.user)
    {
        res.redirect('/users/private')
    }
    else
    {
        res.render('users/signup')
    }
})

router.post(/*users*/'/signup',async(req,res)=>{
    //attr
    const username=req.body.username
    const password=req.body.password
    const email=req.body.email
    const gender=req.body.gender

    let inserted=undefined
    try
    {
        
        inserted=await users.addUser(username,password,email,gender)
        console.log('1')
        if(inserted.userInserted===true)
        {
            console.log('2')
            res.redirect('/users/login')
        }
        else
        {
            console.log('3')
            res.status(500).json('Internal Server Error')
            return
        }
    }
    catch(e)
    {
        console.log('4')
        res.status(400).render('users/signup',{
            hasError:true,
            error:e
        })
    }
})

router.post(/*users*/'/login',async(req,res)=>{
    let username=req.body.username
    let password=req.body.password

    let AuthCookie=undefined
    try
    {
        AuthCookie=await users.checkIfAccessed(username,password)
        if(AuthCookie.authenticated===true)
        {
            const user=await users.getUserByUsername(username)
            req.session.user=
            user
            res.redirect('/users/private')
        }
        else
        {
            // 
        }
    }
    catch(e)
    {
        res.status(400).render('users/login',{
            hasError:true,
            error:e
        })
    }
})

router.get(/*users*/'/private',(req,res)=>{ 
    if(req.session.user)
    {
        res.status(400).render('users/private',{
            user:req.session.user
        })
    }
    else
    {
        res.render('users/login')
    }
})

router.get(/*users*/'/logout',(req,res)=>{ 
    res.clearCookie('AuthCookie')
    res.render('users/logout')
})

module.exports=router

