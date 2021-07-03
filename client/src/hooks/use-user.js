import axios from 'axios';
import { useQuery } from 'react-query';
import { getUser } from '../utils/local-storage';

const BACKEND_URL = 'http://localhost:3000';

export default function useUser() {
  let config = {
    method: 'get',
    url: `${BACKEND_URL}/api/auth/user`,
    headers: { 'x-auth-token': getUser() },
  };

  return useQuery('user', async () => {
    const { data } = await axios(config);
    return data;
  }, {
    refetchOnWindowFocus: false,
    staleTime: 10000
  });
}