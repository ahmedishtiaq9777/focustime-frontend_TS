import type {
  UserCreateDTO as SignupRequest,
  UserResponse,
} from "focustime_types";
import axiosPublic from "./axiospublic";
import axiosClient from "./axiosclient";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserResponse;
}

export const LoginApi = async (data: LoginRequest) => {
  const res = await axiosPublic.post<LoginResponse>("/login", data);
  return res.data;
};
export async function signupApi(data: SignupRequest) {
  const res = await axiosPublic.post("/adduser", data);
  console.log("response:", res);
  return res.data;
}
export async function Logout() {
  const res = await axiosClient.post("/logout");
  return res;
}
