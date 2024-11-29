import { SERVER } from '$lib/config';
import { type User } from '$lib/stores/userStore';

export const getUserSession = async (): Promise<User | null> => {
  try {
    const response = await fetch(`${SERVER}/session`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return response.json() as unknown as User;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
