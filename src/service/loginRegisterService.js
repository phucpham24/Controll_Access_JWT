import db from "../models/index";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) {
    return true;
  }
  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });

  if (user) {
    return true;
  }
  return false;
};

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const registerNewUser = async (rawUserData) => {
  try {
    //check email, phone : existed or not
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "the email is already existed",
        EC: 1,
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "the phone is already existed",
        EC: 1,
      };
    }
    // hash password
    let hashPass = hashPassword(rawUserData.password);

    // create a new user

    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPass,
      phone: rawUserData.phone,
    });
    return {
      EM: "A user is created successfully",
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service model",
      EC: -2,
    };
  }
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};

const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });

    if (user) {
      console.log(">>found user with email or phone ");
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword == true) {
        return {
          EM: "ok",
          EC: 0,
          DT: "",
        };
      }
    }
    console.log(
      ">> input user with email/phone: ",
      rawData.valueLogin,
      "password",
      rawData.password
    );
    return {
      EM: "your email/phone number or  password is incorrect",
      EC: 1,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service .....",
      EC: -2,
    };
  }
};
module.exports = {
  registerNewUser,
  handleUserLogin,
};
