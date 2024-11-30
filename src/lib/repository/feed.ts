import type { Feed } from '$lib/utils/types';
import feedJson from '$mocks/feeds';

export default class FeedRepository {
  private static _instance: FeedRepository;
  private debug: boolean;
  private constructor() {
    this.debug = true; // todo switch it for production!
  }
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
  public async getNextFeed(
    offset: number,
    size: number,
    direction: boolean = false,
  ): Promise<Feed[]> {
    if (this.debug) {
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
