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
