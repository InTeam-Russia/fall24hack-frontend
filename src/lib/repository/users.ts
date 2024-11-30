import type { ApiError, User } from '$lib/utils/types';

import { SERVER } from '$lib/config';
import { userStore } from '$lib/stores/userStore';
import { debugStore } from '$lib/stores/debugStore';
import SessionMock from '$mocks/session';

export const logout = async (): Promise<void> => {};

export interface SessionResponse {
  Id: number;
  CreatedAt: number;
  FirstName: string;
  LastName: string;
  Username: string;
  Email: string;
  Role: string;
  TgLink: string;
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
  public async Login() {}
  public async Register() {}
  public async GetSession(): Promise<User | null> {
    if (debugStore) {
      return SessionMock;
    }
    const response: SessionResponse | ApiError | null = await this.fetchSession();
    if (!response || !('Id' in response)) {
      return null;
    }
    const session: SessionResponse = response as SessionResponse;
    const user: User = {
      firstName: session.FirstName,
      lastName: session.LastName,
      username: session.Username,
      email: session.Email,
      tgLink: session.TgLink,
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
        window.location.href = '/';
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
