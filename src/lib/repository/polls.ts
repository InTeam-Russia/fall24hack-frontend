//import { debugStore } from '$lib/stores/debugStore';
export class Polls {
  private static _instance: Polls;
  private constructor() {}
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}
