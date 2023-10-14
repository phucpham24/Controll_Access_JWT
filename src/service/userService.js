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
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    const [rows, fields] = await connection.execute('SELECT * FROM User');
    return rows;
    
}

const deleteUser = async(id)=> {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    const [rows, fields] = await connection.execute('DELETE FROM User WHERE id =?', [id]);
}

const getUserById = async(id) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    const [rows, fields] = await connection.execute('SELECT * FROM User WHERE id =?', [id]);
    return rows;
}

const updateUserInfo  = async(email, username,id)=>{
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    const [rows, fields] = await connection.execute('UPDATE User SET email = ?, username = ? WHERE id =?', [email, username,id]);
    return rows;
}
module.exports = {
    createNewUser, 
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfo,
}