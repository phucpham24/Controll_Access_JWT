import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import bluebird from 'bluebird';



const salt = bcrypt.genSaltSync(10);
  

const hashPassword = (userPassword)=>{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async(email, password, username)=>{
    let hashPass = hashPassword(password);
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    const [rows, fields] = await connection.execute('INSERT INTO users(email, password, username) VALUES (?, ?, ?)', [email, hashPass, username]);


}

const getUserList = async()=> {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    return rows;
    
}

const deleteUser = async(id)=> {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    const [rows, fields] = await connection.execute('DELETE FROM users WHERE id =?', [id]);
}

const getUserById = async(id) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id =?', [id]);
    return rows;
}

const updateUserInfo  = async(email, username,id)=>{
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    const [rows, fields] = await connection.execute('UPDATE users SET email = ?, username = ? WHERE id =?', [email, username,id]);
    return rows;
}
module.exports = {
    createNewUser, 
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfo,
}