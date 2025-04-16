export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileAbout = document.querySelector(aboutSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._profileAvatar.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name !== undefined) this._profileName.textContent = name;
    if (about !== undefined) this._profileAbout.textContent = about;
    if (avatar !== undefined) this._profileAvatar.src = avatar;
  }
}
