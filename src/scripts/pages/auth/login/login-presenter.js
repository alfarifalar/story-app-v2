export default class LoginPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async login({ email, password }) {
    this.#view.showSubmitLoadingButton();

    try {
      const response = await this.#model.login({ email, password });
      console.log('Login: response:', response);

      const { error, message, loginResult } = response.data;

      if (error) {
        this.#view.loginFailed(message);
        return;
      }

      this.#authModel.putUserToken(loginResult.token);

      this.#view.loginSuccessfully(message, loginResult);

    } catch (error) {
      console.error('login: error:', error);
      this.#view.loginFailed(error.message || 'Terjadi kesalahan saat login');
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
