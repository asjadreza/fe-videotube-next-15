import axios from 'axios';
import { GET_CHANNEL_PROFILE } from '@/utils/constants';

export class ChannelService {

  static async getChannelProfile(username, token) {
    try {
      const res = await axios.get(`${GET_CHANNEL_PROFILE}/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error fetching channel profile");
    }
  }

}