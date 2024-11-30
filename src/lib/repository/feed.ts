import type { Feed, User } from '$lib/utils/types';
import feedJson from '$mocks/feeds';
import { debugStore } from '$lib/stores/debugStore';
import { get } from 'svelte/store';
import { Polls } from './polls';
import { Recomendations } from './recomendations';

export default class FeedRepository {
  private static _instance: FeedRepository;
  private constructor() {}
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
  public async getNextFeed(
    index: number,
    pollsPerPage: number,
    usersPerPage: number,
    direction: boolean = false,
  ): Promise<Feed[]> {
    const directionName: 'codirectional' | 'opposite' = direction ? 'codirectional' : 'opposite';

    if (get(debugStore).feed) {
      return await this.getMockedFeed();
    }
    const feed: Feed[] = await Polls.Instance.GetPolls({
      pageIndex: index,
      pageSize: pollsPerPage,
    });
    const users: User[] = await Recomendations.Instance.GetRecomendations(
      index,
      usersPerPage,
      directionName,
    );
    if (users.length != 0) {
      feed.push(users);
    }
    return feed;
  }

  private async getMockedFeed(): Promise<Feed[]> {
    const delay = (ms: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };
    await delay(2000);
    const json: Feed[] = feedJson as Feed[];
    return json;
  }
}
