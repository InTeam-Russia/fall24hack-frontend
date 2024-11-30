import { SERVER } from '$lib/config';
import { objectToQueryString } from '$lib/utils/converters';
import type { User } from '$lib/utils/types';

export class Recomendations {
  private static _instance: Recomendations;
  private constructor() {}
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async GetRecomendations(
    index: number,
    size: number,
    type: 'codirectional|opposite',
  ): Promise<(User & { overlappingPercentage: number })[]> {
    const queryParameters = objectToQueryString({
      pageIndex: index,
      pageSize: size,
      searchType: type,
    });

    try {
      const response = await fetch(`${SERVER}/users${queryParameters}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        return [];
      }
    } catch {
      return [];
    }
  }
}
