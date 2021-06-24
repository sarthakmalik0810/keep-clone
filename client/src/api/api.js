const BACKEND_URL = 'https://localhost:3000/api';
import axios from 'axios'

const login = async (email, password) => {
  let user = {email, password};
  let config = {
    method: 'post',
    url: `${BACKEND_URL}/api/auth/`,
    headers: {'Content-Type': 'application/json'}
  }
  try {
    const response = await axios.post(config, user);
    if(response.status === 200) {
      console.log(response.data);
    }
  } catch (err) {
    console.log(err.message)
  }
  

}