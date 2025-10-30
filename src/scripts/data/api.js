import CONFIG from '../config';
import axios from 'axios';
import { getUserToken } from '../utils/auth';

const ENDPOINTS = {
  // auth
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,

  // add story
  ADD_NEW_STORY: `${CONFIG.BASE_URL}/stories`,

  // get all story
  GET_ALL_STORY: `${CONFIG.BASE_URL}/stories`,

  // get detail story
  GET_DETAIL_STORY: (id) => `${CONFIG.BASE_URL}/stories/${id}`,
};

export async function register({ name, email, password }) {
  return await axios.post(ENDPOINTS.REGISTER, { name, email, password });
}
 
export async function login({ email, password }) {
  return await axios.post(ENDPOINTS.LOGIN, { email, password });
}

export  async function getAll(){
  return await axios.get(ENDPOINTS.GET_ALL_STORY,{
    headers:{
      Authorization: `Bearer ${getUserToken(CONFIG.USER_TOKEN_KEY)}`,
    },
  });
}

export  async function getById(id){
  return await axios.get(ENDPOINTS.GET_DETAIL_STORY(id),{
    headers: {
      Authorization: `Bearer ${getUserToken(CONFIG.USER_TOKEN_KEY)}`,
    },
  });
}
  

export  async function addStory({description, photo, lat, lon}){
  const data = {description, photo, lat, lon};
  return await axios.post(ENDPOINTS.ADD_NEW_STORY, data, {
    headers: {
      "Content-Type": 'multipart/form-data',
      Authorization: `Bearer ${getUserToken(CONFIG.USER_TOKEN_KEY)}`,
    },
  });
}
  