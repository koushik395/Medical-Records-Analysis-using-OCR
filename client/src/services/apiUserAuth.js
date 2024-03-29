import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

export async function signup(body) {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/users/signup",
      body,
    );
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.message);
  }
}

export async function login(body) {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/users/login",
      body,
    );
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.message);
  }
}

export async function forgotPassword(body) {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/users/forgotPassword",
      body,
    );

    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.message);
  }
}

export async function resetPassword(data) {
  const password = data.password;
  const passwordConfirm = data.passwordConfirm;
  const resetToken = data.token;
  let body = { password, passwordConfirm };
  try {
    const res = await axios.patch(
      `http://localhost:3000/api/v1/users/resetPassword/${resetToken}`,
      body,
    );
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.message);
  }
}

export async function updatePassword(body) {
  try {
    const res = await axios.patch(
      "http://localhost:3000/api/v1/users/updateMyPassword",
      body,
    );

    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.message);
  }
}

export async function updateUser(body) {
  console.log(body);
  try {
    const res = await axios.patch(
      "http://localhost:3000/api/v1/users/updateMe",
      body,
    );
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.message);
  }
}

export async function logout() {
  try {
    const res = await axios.get("http://localhost:3000/api/v1/users/logout");
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  try {
    const res = await axios.get("http://localhost:3000/api/v1/users");
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

export async function uploadPrescription(body) {
  console.log(...body);
  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/users/addHealthReport",
      body,
    );
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

export async function getMyPrescriptions() {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/v1/users/prescriptions",
    );
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

export async function getMyStats() {
  try {
    const res = await axios.get("http://localhost:3000/api/v1/users/stats");
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}
