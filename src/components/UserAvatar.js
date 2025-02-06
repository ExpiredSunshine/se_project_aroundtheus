export default class UserAvatar {
  constructor(avatarSelector) {
    this._profileAvatar = avatarSelector;
  }

  setUserAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }
}
