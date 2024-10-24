export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const REGISTER_URL = `${API_BASE_URL}/api/v1/users/register`;
export const LOGIN_URL = `${API_BASE_URL}/api/v1/users/login`;
export const LOGOUT_URL = `${API_BASE_URL}/api/v1/users/logout`;

// videos
export const GET_ALL_VIDEOS = `${API_BASE_URL}/api/v1/videos/`;

// user's channel 
export const GET_CHANNEL_PROFILE = `${API_BASE_URL}/api/v1/users/channel`;
