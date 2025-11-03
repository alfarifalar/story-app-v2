export default class StoriesDetailPresenter {
  #storyId;
  #view;
  #model;
  #dbModel;


  constructor( storyId, {view, model, dbModel }) {
    this.#storyId = storyId;
    this.#view = view;
    this.#model = model;
    this.#dbModel = dbModel;
  }

  async showStoryMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
      
    } catch (error) {
      console.error('showStoriesListMap-error:', error);
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
  async saveStory() {
    try {
      const story = await this.#model.getById(this.#storyId);
      await this.#dbModel.putStory(story.story);
      this.#view.saveToBookmarkSuccessfully('Success to save to bookmark');
    } catch (error) {
      console.error('saveStory-error:', error);
      this.#view.saveToBookmarkFailed(error.message);
    }
  }

  async removeStory() {
    try {
      await this.#dbModel.removeStory(this.#storyId);
      this.#view.removeFromBookmarkSuccessfully('Success to remove from bookmark');
    } catch (error) {
      console.error('removeReport: error:', error);
      this.#view.removeFromBookmarkFailed(error.message);
    }
  }
 
  async showSaveButton() {
    if (await this.#isStorySaved()) {
      this.#view.renderRemoveButton();
      return;
    }
 
    this.#view.renderSaveButton();
  }
 
  async #isStorySaved() {
    return !!(await this.#dbModel.getStoryById(this.#storyId));
  }
}
