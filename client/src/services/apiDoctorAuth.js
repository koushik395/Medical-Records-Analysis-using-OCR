import axios from "axios";
import toast from "react-hot-toast";

export async function signup(body) {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/doctor/signup",
      body,
    );
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

export async function login(body) {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/doctor/login",
      body,
    );

    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

export async function forgotPassword(body) {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/doctor/forgotPassword",
      body,
    );

    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

export async function resetPassword(data) {
  const password = data.password;
  const passwordConfirm = data.passwordConfirm;
  const resetToken = data.token;
  let body = { password, passwordConfirm };
  try {
    const res = await axios.patch(
      `http://localhost:3000/api/v1/doctor/resetPassword/${resetToken}`,
      body,
    );

    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

export async function updatePassword(body) {
  try {
    const res = await axios.patch(
      "http://localhost:3000/api/v1/doctor/updateMyPassword",
      body,
    );

    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

export async function updateUser(body) {
  try {
    const res = await axios.patch(
      "http://localhost:3000/api/v1/doctor/updateMe",
      body,
    );
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

export async function logout() {
  try {
    const res = await axios.get("http://localhost:3000/api/v1/doctor/logout");
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

export async function getCurrentUser() {
  try {
    const res = await axios.get("http://localhost:3000/api/v1/doctor");
    let data;
    if (!res?.data?.data) {
      data = {};
    } else {
      data = res.data.user;
    }
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

export async function getPatient(body) {
  try {
    const res = await axios.post("http://localhost:3000/api/v1/doctor", body);
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}
