import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import bluebird from 'bluebird';
import db from '../models/index';


const salt = bcrypt.genSaltSync(10);
  

const hashPassword = (userPassword)=>{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async(email, password, username)=>{
    let hashPass = hashPassword(password);
    db.User.create({
        username: username,
        email: email,
        password: hashPass
    })

}

const getUserList = async()=> {
    //test relationship
    let newUser = await db.User.findOne({
        Where: {id : 1},
        attributes: ["id", "username", "email"],
        include:  {model:db.Group, attributes: ["name", "description"] },
        raw: true,
        nest: true
    });
    console.log("check new user",newUser);

    let role = await db.Group.findAll({
        include: {model:db.Role, Where: {id : 1}},
        raw: true,
        nest: true
    });
    console.log("check new role",role);
    let  users = [];
    users = await db.User.findAll();
    return users;
    
}

const deleteUser = async(userId)=> {
    await db.User.destroy({
        where: {id : userId}
    })
}

const getUserById = async(id) => {
    let user = {};
    user = await db.User.findOne({
        where: {id : id}
    });

    return user;
}

const updateUserInfo  = async(email, username,id)=>{
    await db.User.update(
        {   email: email, 
            username: username}, 
            {
                where: {id: id}})
}
module.exports = {
    createNewUser, 
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfo,
}