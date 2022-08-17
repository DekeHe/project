module.exports=
{
	checkUsername(v,s)
	{
		if(!v)throw `Error:You must supply a ${s}!`

		if(typeof v!=='string')
		throw `Error:provided${v} is not a string for ${s}!`

		if(v.indexOf(' ')!==-1)
		throw `Error:${v} has empty spaces for ${s}!`

		let re=/^[A-Za-z0-9]*$/
		if(!re.test(v))
		throw `Error:${v} has sth out of nums and alphas for ${s}!`

		if(v.length<6)
		throw `Error:${v} should be at least 4 chars long for ${s}!`

		return v
	},

	checkPassword(v,s)
	{
		if(!v)throw `Error:You must supply a ${s}!`

		if(typeof v!=='string')
		throw `Error:provided${v} is not a string for ${s}!`

		if(v.indexOf(' ')!==-1)
		throw `Error:${v} has empty spaces for ${s}!`

		if(v.length<6)
		throw `Error:${v} is not at least 6 characters long for ${s}!`

		return v
	},

    checkEmail(v,s)
	{
		if(!v)throw `Error:You must supply a ${s}!`

		if(typeof v!=='string')
		throw `Error:provided${v} is not a string for ${s}!`

		if(v.indexOf(' ')!==-1)
		throw `Error:${v} has empty spaces for ${s}!`

        let re=/\S+@\S+\.\S+/
        if(!re.test(v))
        throw `Error:${v} is not valid for a ${s}`

		return v
	},
    checkGender(v,s)
	{
		if(!v)throw `Error:You must supply a ${s}!`

		if(typeof v!=='string')
		throw `Error:provided${v} is not a string for ${s}!`

		if(v.indexOf(' ')!==-1)
		throw `Error:${v} has empty spaces for ${s}!`

		let re=/^[A-Za-z0-9]*$/
		if(!re.test(v))
		throw `Error:${v} has sth out of nums and alphas for ${s}!`

		return v
	},
}