export default class StoriesDetailPresenter {
  #storyId;
  #view;
  #model;

  constructor( storyId, {view, model }) {
    this.#storyId = storyId;
    this.#view = view;
    this.#model = model;
  }

  async showStoryMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
      
    } catch (error) {
      console.error('showStoriesListMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async initialStory() {
    this.#view.showLoading();

    try {
      const response = await this.#model.getById(this.#storyId);
            
      if (!response.ok) {
        console.error('StoryDetail-response:', response);
        this.#view.populateStoryError(response.message);
        return;
      }

      this.#view.populateStory(response.message, response.story);
    } catch (error) {
      console.error('StoryDetail-error:', error);
      this.#view.populateStoryError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
