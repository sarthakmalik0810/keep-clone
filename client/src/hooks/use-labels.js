import axios from 'axios';
import { useQuery } from 'react-query';
import { getUser } from '../utils/local-storage';

const BACKEND_URL = 'http://localhost:3000';

export default function useLabels() {
  let config = {
    method: 'get',
    url: `${BACKEND_URL}/api/labels/`,
    headers: { 'x-auth-token': getUser() },
  };

  return useQuery('labels', async () => {
    const { data } = await axios(config);
    return data;
  });
}
