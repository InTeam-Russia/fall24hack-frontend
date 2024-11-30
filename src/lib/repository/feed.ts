import type { Feed } from '$lib/utils/types';

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
    const delay = (ms: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };

    console.log(direction); // TODO: mock for linter, remove this when fetch is used

    await delay(2000);

    return [
      {
        id: 1,
        type: 'radio',
        text: 'Выбери свою ориентацию (иначе ты пидорас)',
        variants: ['Гей', 'Пидорас', 'Гомосек'],
        author: {
          firstName: 'Иван',
          lastName: 'Афоничев',
          username: 'iafonichev',
          email: 'iafonichev@gmail.com',
          tgLink: 't.me/BoringPlace',
        },
      },
      [
        {
          firstName: 'Иван',
          lastName: 'Афоничев',
          username: 'iafonichev',
          email: 'iafonichev@gmail.com',
          tgLink: 't.me/BoringPlace',
        },
        {
          firstName: 'Марк',
          lastName: 'Даун',
          username: 'markdaun',
          email: 'markdaun@gmail.com',
          tgLink: 't.me/markdaun',
        },
        {
          firstName: 'Яна',
          lastName: 'Цист',
          username: 'cistit',
          email: 'agile@nigga.com',
          tgLink: 't.me/fuckmeplsomg',
        },
      ],
      {
        id: 2,
        type: 'text',
        text: 'Опиши свои чувства по отношению к Третьему рейху',
        author: {
          firstName: 'Иван',
          lastName: 'Афоничев',
          username: 'iafonichev',
          email: 'iafonichev@gmail.com',
          tgLink: 't.me/BoringPlace',
        },
      },
    ] as unknown as Feed[];
  }
}
