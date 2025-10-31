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
      <a class="nav-link d-lg-flex align-items-center gap-2 p-0 px-md-2 py-md-1 active text-white text-center " aria-current="page" href="#/">
        Home
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link d-lg-flex align-items-center gap-2 p-0 px-md-2 py-md-1 text-white text-center" href="#/new">
        Add Story
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link d-lg-flex align-items-center gap-2 p-0 px-md-2 py-md-1 text-white text-center"  href="#/developer">
        Dev Profile
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link d-lg-flex align-items-center gap-2 p-0 px-md-2 py-md-1 text-white text-center" href="#/logout" id="logout-button">
        <i class="fa-solid fa-right-from-bracket d-md-none d-lg-inline"></i>
        Logout
      </a>
    </li>
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
          <img src="${photoUrl}" alt="Story from ${name}" class="card-img">

          <div id="map" class="map-container"></div>
          <div id="map-loading-container"></div>
        </div>
        <div class="card-body">
          <h2 class="card-title">${name}</h2>
          <p class="card-date">${showFormattedDate(createdAt)}</p>
          <p class="card-text">${description}</p>
          <p class="card-text">Diambil dilokasi : [${lat}, ${lon}]</p>
        </div>
      </div>
  `;
}

