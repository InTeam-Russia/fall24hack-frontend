import { SERVER } from '$lib/config';
import { objectToQueryString } from '$lib/utils/converters';
import type { Poll, PollAnswer, PollsRequest } from '$lib/utils/types';

//import { debugStore } from '$lib/stores/debugStore';
export class Polls {
  private static _instance: Polls;
  private constructor() {}
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
  public async GetPolls(request: PollsRequest): Promise<Poll[]> {
    try {
      const queryParameters = objectToQueryString({
        pageIndex: request.pageIndex,
        pageSize: request.pageSize,
      });
      const response = await fetch(`${SERVER}/polls${queryParameters}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return response.json() as unknown as Poll[];
      } else {
        return [];
      }
    } catch {
      return [];
    }
  }

  public async AddPoll(poll: Poll): Promise<null | string> {
    try {
      const response = await fetch(`${SERVER}/polls`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(poll),
      });

      if (response.ok) {
        return null;
      }
      return 'Возникли проблемы на сервере';
    } catch {
      return 'fetch не отработал';
    }
  }

  public async AnswerThePoll(pollAnswer: PollAnswer): Promise<null | string> {
    try {
      const response = await fetch(`${SERVER}/polls/${pollAnswer.pollId}/answer`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answer: pollAnswer,
        }),
      });

      if (response.ok) {
        return null;
      }
      return 'Возникли проблемы на сервере';
    } catch {
      return 'fetch не отработал';
    }
  }
}
