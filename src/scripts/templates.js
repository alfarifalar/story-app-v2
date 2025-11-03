import { showFormattedDate } from "./utils";

// Template Loader
export function loaderTemplate(){
  return`
    <div class="loader"></div>
  `;
}

// Template absolute loader
export function loaderAbsoluteTemplate(){
  return`
    <div class="loader loader-absolute"></div>
  `;
}

export function unauthenticatedNavigationListTemplate(){
  return`
    <li class="nav-item">
      <a id="login-button" class="nav-link d-lg-flex align-items-center gap-2 p-0 px-md-2 py-md-1 active text-white text-center" aria-current="page" href="#/login">Login</a>
    </li>
    <li class="nav-item">
      <a id="register-button" class="nav-link d-lg-flex align-items-center gap-2 p-0 px-md-2 py-md-1 text-white text-center" href="#/register">Register</a>
    </li>
  `;
}

export function authenticatedNavigationListTemplate(){
  return`
    <li class="nav-item">
      <a class="nav-link gap-2 p-0 px-md-2 py-md-1 active text-white text-center " aria-current="page" href="#/">
        Home
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link gap-2 p-0 px-md-2 py-md-1 text-white text-center " href="#/bookmark">
        Bookmarks
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link gap-2 p-0 px-md-2 py-md-1 text-white text-center" href="#/new">
        Add Story
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link gap-2 p-0 px-md-2 py-md-1 text-white text-center"  href="#/developer">
        Dev Profile
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link d-lg-flex align-items-center gap-2 p-0 px-md-2 py-md-1 text-white text-center" href="#/logout" id="logout-button">
        <i class="fa-solid fa-right-from-bracket d-md-none d-lg-inline"></i>
        Logout
      </a>
    </li>
    <li id="push-notification-tools" class="nav-item text-center"></li>
  `;
}

export function emptyTemplate(data){
  return `
    <div class="text-center">
      <h2>No ${data} found</h2>
      <p>It seems there are no ${data.toLowerCase()} available right now.</p>
    </div>
  `;
}

export function errorTemplate(message, data){
  return `
    <div class="text-center">
      <h2>Oops! Failed to load ${data}</h2>
      <p>${message ? message : 'We couldn’t load your stories. Please check your connection and try again.'}</p>
    </div>
  `;
}

export function storyItemTemplate({
  id,
  name,
  photoUrl,
  createdAt,
  description,
}){
  return`
    <div class="masonry-item col-12 col-md-6 col-lg-4">
      <a href="#/story/${id}" class="text-decoration-none">
        <div class="card">
          <img src="${photoUrl}" alt="Story from ${name}" class="card-img">
          <div class="card-body">
            <h2 class="card-title">${name}</h2>
            <p class="card-date">${showFormattedDate(createdAt)}</p>
            <p class="card-text">${description}</p>
          </div>
        </div>
      </a>
    </div>
  `;
}

export function storyDetailTemplate({
  name,
  photoUrl,
  createdAt,
  description,
  lat,
  lon,
}){
  return`
      <div class="card">
        <div class="card-header p-0">
          <div id="map" class="map-container"></div>
          <div id="map-loading-container"></div>
          <img src="${photoUrl}" alt="Story from ${name}" class="card-img">

        </div>
        <div class="card-body">
          <h2 class="card-title">${name}</h2>
          <p class="card-date">${showFormattedDate(createdAt)} | [${lat}, ${lon}]</p>
          <p class="card-text">${description}</p>
        </div>
      </div>
  `;
}

export function subscribeButtonTemplate(){
  return `
    <button id="subscribe-button" class="btn btn-transparent text-white">
      <span><i class="fa-solid fa-bell"></i></span> Subscribe
    </button>
  `;
}
export function unsubscribeButtonTemplate(){
  return `
    <button id="unsubscribe-button" class="btn btn-transparent text-white">
      <span><i class="fa-solid fa-bell-slash"></i></span> Unsubscribe
    </button>
  `;
}

export function saveStoryButtonTemplate() {
  return `
    <button id="story-detail-save" class="btn btn-cyan">
      <i class="fa-regular fa-bookmark"></i> Save Story 
    </button>
  `;
}

export function removeStoryButtonTemplate() {
  return `
    <button id="story-detail-remove" class="btn btn-cyan">
      <i class="fa-solid fa-bookmark"></i> Remove Story 
    </button>
  `;
}