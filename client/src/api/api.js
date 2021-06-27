import axios from 'axios';
const BACKEND_URL = 'http://localhost:3000';

export const login = async ({ email, password }) => {
  let config = {
    method: 'post',
    url: `${BACKEND_URL}/api/auth/`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      email: email,
      password: password,
    },
  };
  const response = await axios(config);
  return response.data;
};

export const fetchTodos = async token => {
  let config = {
    method: 'get',
    url: `${BACKEND_URL}/api/todo/get-todos`,
    headers: { 'x-auth-token': token },
  };
  const { data } = await axios(config);
  return data;
};

export const fetchLabels = async token => {
  let config = {
    method: 'get',
    url: `${BACKEND_URL}/api/labels/get-labels`,
    headers: { 'x-auth-token': token },
  };
  const { data } = await axios(config);
  return data;
};

export const fetchUser = async token => {
  let config = {
    method: 'get',
    url: `${BACKEND_URL}/api/auth/user`,
    headers: { 'x-auth-token': token },
  };
  const { data } = await axios(config);
  return data;
};
