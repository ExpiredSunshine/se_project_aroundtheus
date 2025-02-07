export default class UserAvatar {
  constructor({ avatarSelector }) {
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserAvatar() {
    return { avatar: this._profileAvatar.src };
  }

  setUserAvatar({ avatar }) {
    this._profileAvatar.src = avatar;
  }
}
