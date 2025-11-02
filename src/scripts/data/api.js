import { BASE_URL } from '../config';
import { getUserToken } from '../utils/auth';

const ENDPOINTS = {
  // auth
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,

  // add story
  ADD_NEW_STORY: `${BASE_URL}/stories`,

  // get all story
  GET_ALL_STORY: `${BASE_URL}/stories`,

  // get detail story
  GET_DETAIL_STORY: (id) => `${BASE_URL}/stories/${id}`,
};

export async function register({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });
  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return{
    ...json,
    status: fetchResponse.ok,
  };
}
 
export async function login({ email, password }) {
  const data = JSON.stringify({ email, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export  async function getAll(){
  const userToken = getUserToken();

  const fetchResponse = await fetch(ENDPOINTS.GET_ALL_STORY, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export  async function getById(id){
  const userToken = getUserToken();

  const fetchResponse = await fetch(ENDPOINTS.GET_DETAIL_STORY(id), {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export  async function addStory({description, photo, lat, lon}){
  const userToken = getUserToken();

  const formData = new FormData();
  formData.append('photo', photo);
  formData.append('description', description);
  if (lat) formData.append('lat', lat);
  if (lon) formData.append('lon', lon);
  
  const fetchResponse = await fetch(ENDPOINTS.ADD_NEW_STORY, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: formData,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

  