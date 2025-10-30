export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async register({ name, email, password }) {
    this.#view.showSubmitLoadingButton();

    try {
      const response = await this.#model.register({ name, email, password });
      console.log('getRegistered: response:', response);

      const { error, message } = response.data;

      if (error) {
        this.#view.registeredFailed(message);
        return;
      }

      this.#view.registeredSuccessfully(message);

    } catch (error) {
      console.error('getRegistered: error:', error);
      const message =
        error.response?.data?.message || error.message || 'Terjadi kesalahan saat register';
      this.#view.registeredFailed(message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
