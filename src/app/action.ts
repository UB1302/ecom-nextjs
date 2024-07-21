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
    authToken: uuidv4()
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
    let data = await api.post.login({emailId, password})
    if(data){
        return data
    }
    return false
}