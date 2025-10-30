export default class StoriesDetailPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async initialStory(id) {
    this.#view.showLoading();

    try {
      // panggil API dengan id
      const response = await this.#model.getById(id);
      console.log('StoryDetail Response:', response);

      const { error, message, story } = response.data;

      if (error) {
        console.error('Server error:', message);
        this.#view.populateStoryError(message);
        return;
      }

      // sukses
      this.#view.populateStory(message, story);
    } catch (error) {
      console.error('Request error:', error);

      // ambil pesan error paling detail yang mungkin
      const message =
        error.response?.data?.message ||
        error.response?.request?.responseText ||
        error.message ||
        'Terjadi kesalahan saat memuat cerita.';

      this.#view.populateStoryError(message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
