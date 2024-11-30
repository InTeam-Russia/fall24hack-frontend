import type { ApiError, User } from '$lib/utils/types';

import { SERVER } from '$lib/config';
import { userStore } from '$lib/stores/userStore';
import { debugStore } from '$lib/stores/debugStore';
import SessionMock from '$mocks/session';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';

export const logout = async (): Promise<void> => {};

export interface SessionResponse {
  id: number;
  createdAt: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  tgLink: string;
}

export class Users {
  private static _instance: Users;
  private debug: boolean;
  private constructor() {
    this.debug = true; // todo switch it for production!
  }
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
  public async Login(formRequest: Record<string, string | null>): Promise<null | string> {
    try {
      const response = await fetch(`${SERVER}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formRequest),
      });

      if (response.ok) {
        userStore.set(await Users.Instance.GetSession());
        goto('/profile');
      } else {
        const errorData = await response.json();
        return (errorData.message as string) || 'Ошибка авторизации';
      }
    } catch (error) {
      return (error as string) || 'Сетевая ошибка. Попробуйте позже';
    }
    return null;
  }

  public async Register(formRequest: Record<string, string | null>): Promise<null | string> {
    try {
      const response = await fetch(`${SERVER}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formRequest),
      });

      if (response.ok) {
        goto('/auth');
      } else {
        const errorData = await response.json();
        return (errorData.message as string) || 'Ошибка регистрации';
      }
    } catch (error) {
      return (error as string) || 'Сетевая ошибка. Попробуйте позже';
    }
    return null;
  }

  public async GetSession(): Promise<User | null> {
    if (get(debugStore).session) {
      return SessionMock;
    }
    const response: SessionResponse | ApiError | null = await this.fetchSession();
    if (!response || !('id' in response)) {
      return null;
    }
    const session: SessionResponse = response as SessionResponse;
    const user: User = {
      firstName: session.firstName,
      lastName: session.lastName,
      username: session.username,
      email: session.email,
      tgLink: session.tgLink,
    };
    return user;
  }

  public async Logout(): Promise<void> {
    try {
      const response = await fetch(`${SERVER}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        userStore.set(null);
        goto('/');
      }
    } catch {
      return;
    }
  }

  private async fetchSession(): Promise<SessionResponse | ApiError | null> {
    try {
      const response = await fetch(`${SERVER}/session`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return response.json() as unknown as SessionResponse | ApiError;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }
}
