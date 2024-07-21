"use server";

import { api } from "~/trpc/server";
import { v4 as uuidv4 } from "uuid";

interface UserAccountData {
  name: string;
  emailId: string;
  password: string;
//   authToken: string;
//   verificationCode: number; // Assuming verificationCode is a number
}

interface verificationCode {
  emailId: string;

//   verificationCode: number; // Assuming verificationCode is a number
}

interface verifyCode {
    emailId: string;
    verificationCode: number; // Assuming verificationCode is a number
}

interface loginUser {
    emailId: string;
    password: string; // Assuming verificationCode is a number
}

interface user {
  userId: string
}

interface userCategory {
  userId: string
  categoryId: string
  active: boolean
}

interface userCategory2 {
  userId: string
  categoryId: string
  
}

export const createUserAccount = async ({
  name,
  emailId,
  password,
//   authToken,
//   verificationCode,
}: UserAccountData) => {
  await api.post.createUser({
    name: name,
    emailId: emailId,
    password: password,
    authToken: uuidv4(),
    userId: uuidv4().replaceAll('-', "").substring(5)
  });
};

export const createVerificationCode = async ({
  emailId, 
}: verificationCode) => {
    const eightDigitNumber = generateEightDigitNumber();

  await api.post.createVerificationCode({
    emailId: emailId,
    verificationCode: eightDigitNumber
  });
};



function generateEightDigitNumber() {
    const min = 10000000; // Minimum 8-digit number
    const max = 99999999; // Maximum 8-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const getVerificationCodeAndVerify = async({emailId, verificationCode}: verifyCode) => {
    console.log(typeof verificationCode, "-----------------------------")
    // verificationCode = parseInt(verificationCode)
    let data = await api.post.getVerificationCode({emailId,verificationCode})
    console.log(data, data?.verificationCode, verificationCode)
    if(data?.verificationCode === verificationCode){
        return true
    }
    return false
}   

export const loginUser = async ({emailId, password}:loginUser) => {
  let authToken = uuidv4()
  console.log("loginUser", "******************************")
    let data = await api.post.login({emailId, password})
    if(data){
      await api.post.createLoginAuthToken({userId: data.userId, authToken: authToken})
      data['authToken'] = authToken
      return data
    }
    return false
}

export const updateUserCategory = async ({userId,categoryId, active}: userCategory) => {
  await api.post.updateUserCategory({userId, categoryId, active})
}

export const getUserCategories = async ({userId}:user) => {
  let data = await api.post.getUserCategories({userId})
  console.log(data)
  return data
}

interface pagination {
  page: number
  pageSize: number
}

export const getproductCategories = async ({page, pageSize}: pagination) => {
  let data = await api.post.getProductCategories({page, pageSize})
  console.log(data)
  return data
}

export const createUserCategory = async ({userId, categoryId}:userCategory2) => {
  await api.post.createUserCategory({userId,categoryId})
}