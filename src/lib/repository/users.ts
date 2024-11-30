export class Users {
  private static _instance: Users;
  private debug: boolean;
  private constructor() {
    this.debug = true; // todo switch it for production!
  }
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}
