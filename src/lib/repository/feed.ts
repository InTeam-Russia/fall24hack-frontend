import type { Feed } from '$lib/utils/types';
import feedJson from '$mocks/feeds';
import { debugStore } from '$lib/stores/debugStore';

export default class FeedRepository {
  private static _instance: FeedRepository;
  private constructor() {}
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
  public async getNextFeed(
    offset: number,
    size: number,
    direction: boolean = false,
  ): Promise<Feed[]> {
    if (debugStore) {
      const delay = (ms: number) => {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      };

      console.log(direction); // TODO: mock for linter, remove this when fetch is used

      await delay(2000);

      const json: Feed[] = feedJson as Feed[];
      return json;
    }
    return [];
  }
}
