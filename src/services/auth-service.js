import axios from "axios";
import { REGISTER_URL } from "../utils/constants"
import { LOGIN_URL } from "../utils/constants";
import { LOGOUT_URL } from "../utils/constants";

export class AuthService {

    static async register(formData) {
        const res = await axios.post(`${REGISTER_URL}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    }

    static async login(formData) {
        const res = await axios.post(`${LOGIN_URL}`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return res.data;
      }

      static async logout(token) {
        const res = await axios.post(`${LOGOUT_URL}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the headers
            },
            withCredentials: true // Include this if you're using cookies for authentication
        });
        return res.data;
    }
    
}