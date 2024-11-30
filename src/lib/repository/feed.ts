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
  public async getFeed(): Promise<Feed[]> {
    if (this.debug) {
      const json: Feed[] = feedJson as Feed[];
      return json;
    }
    return [];
  }
}
