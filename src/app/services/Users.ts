import {http} from './http';

export interface UsersData{
    id: number;
    name: string;
    email: string;
    phone: string;
    user_type: string;
    store_id: string;
    accept_pay: string;
    verified_at: string;
};

export interface Users {
    user_token: string;
    status : string;
    message : string;
    user_data? : UsersData;
    access_token? : string;
};

export interface LoginRegisterData{
    email_or_phone:  string;
    password: string;
};

export interface LoginVerifyData{
    email_or_phone: string;
    verify_code: string;
};

export const register = async ( formData : LoginRegisterData): Promise<Users> => {
    const { data } = await http.post<Users>(`users/register`, formData);
    return data;
};

export const verifyUser = async ( formData : LoginVerifyData): Promise<Users> => {
    const { data } = await http.post<Users>(`users/verify_user`, formData);
    return data;
};

export const resendVerifyCode = async ( formData : LoginRegisterData): Promise<Users> => {
    const { data } = await http.post<Users>(`users/resend_verify_code`, formData);
    return data;
};

export const login = async ( formData : any): Promise<Users> => {
    const { data } = await http.post<Users>(`users/login`, formData);
    return data;
};