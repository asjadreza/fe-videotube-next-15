import axios from "axios";
import { GET_ALL_VIDEOS } from "@/utils/constants";

export class VideoService {

    static async getAllVideos(token) {
        const res = await axios.get(`${GET_ALL_VIDEOS}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Add the token here
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    }
}