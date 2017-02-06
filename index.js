const app = { // TODO: make into constructor

  photoset: null,
  flickrApiUrl: `https://api.flickr.com/services/rest/?
    method=flickr.photosets.getPhotos&
    api_key=426a1c2adbd9c8569c74d4a8973068ba&
    format=json&
    photoset_id=72157626579923453`,

  init: function() {
    app.getImages(app.displayImages);
  },

  getImages: function(callback) { // TODO: promisify
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          const jsonFlickrApi = (object) => object;   // matches the name of wrapper function inside of eval(httpRequest.responseText) 
          app.photoSet = eval(httpRequest.responseText).photoset.photo;
          callback(app.photoSet);
        } else {
          console.err('request failed');
        }
      }
    };
    httpRequest.open('GET', app.flickrApiUrl, true);
    httpRequest.send();
  },

  displayImages: function(photos) {
    for (let i = 0; i < photos.length; i++) {
      const src = app.createImageUrl(photos[i]);
      app.createImageNode(src);
    }
  },

  createImageNode: function(url) {
    const tile = document.createElement('div');
    tile.setAttribute('class', 'tile');
    const imageContainer = document.createElement('div');
    imageContainer.setAttribute('class', 'image-container');
    const anchor = document.createElement('a');
    const largeImageUrl = app.createImageUrl({ url }, 'b');
    anchor.setAttribute('href', '#');
    anchor.setAttribute('largeImageUrl', largeImageUrl);
    anchor.onclick = app.toggleLightbox;
    const image = document.createElement('img');
    image.setAttribute('src', url);
    anchor.appendChild(image);
    imageContainer.appendChild(anchor);
    tile.appendChild(imageContainer);
    document.getElementsByClassName('tiles')[0].appendChild(tile);
    return tile;
  },

  createImageUrl: function({ farm, id, server, secret, url }, size = 'n') {
    if (url) {
      url = url.split('');
      url.splice(-5, 1, size);
      return url.join('');
    } else {
      return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
    }
  },

  toggleLightbox: function(event) {
    const largeImageUrl = event.currentTarget.attributes[1].nodeValue;
    const modal = document.getElementsByClassName('modal')[0];
    modal.style.display = 'block';
    modal.children[0].setAttribute('src', largeImageUrl);
  }
};

app.init();

