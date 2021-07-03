import axios from 'axios';
import { useQuery } from 'react-query';
import { getUser } from '../utils/local-storage';

const BACKEND_URL = 'http://localhost:3000';

export default function useTodos() {
  let config = {
    method: 'get',
    url: `${BACKEND_URL}/api/todo/`,
    headers: { 'x-auth-token': getUser() },
  };

  return useQuery('todos', async () => {
    const { data } = await axios(config);
    return data;
  },
  {
    refetchOnWindowFocus: false
  });
}
