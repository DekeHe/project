const bcrypt=require('bcrypt')
const uuid=require('uuid/v4')

const mongoCollections=require('../config/mongoCollections')
const usersF=mongoCollections.users
const validation=require('../validation')

const saltRound=7

module.exports=
{
    async getAllUsers()
    {
        const userCollection=await usersF()
        return await userCollection.find({}).toArray()
    },

    //attr
    async addUser(username,password,email,gender)
    {
        username=validation.checkUsername(username.toLowerCase (),'username')
        password=validation.checkPassword(password,'password')
        email=validation.checkEmail(email,'email')
        gender=validation.checkGender(gender.toLowerCase (),'gender')

        const users=await this.getAllUsers()

        for(let v of users)
        {
            if(v.username===username)
            {
                throw `Error:${username} already exists in the database`
            }
        }

        const h=await bcrypt.hash(password,saltRound)

        //attr
        const userInfo=
        {
            _id:uuid(),
            username:username,
            password:h,
            email:email,
            gender:gender
        }

        const userCollection=await usersF()
        const inserted=await userCollection.insertOne(userInfo)
        if(inserted.insertedCount===0)throw 'Insert failed'
        return {userInserted:true}
    },

    async checkIfAccessed(username,password)
    {
        username=validation.checkUsername(username,'username')
        password=validation.checkPassword(password,'password')

        const users=await this.getAllUsers()

        let user=undefined
        for(let v of users)
        {
            if(v.username===username)
            {
                user=v
                break
            }
        }
        if(!user)throw `Error:Either the username or password is invalid`
        const matched=await bcrypt.compare(password,user.password)
        if(matched)
        {
            return {authenticated:true}
        }
        else
        {
            throw 'Error:Either the username or password is invalid'
        }

    },

    async getUserByUsername(username)
    {
        let user=undefined
        const allUsers=await this.getAllUsers()
        for(let v of allUsers)
        {
            if(v.username===username)
            {
                user=v
                break
            }
        }
        return user
    }
}


