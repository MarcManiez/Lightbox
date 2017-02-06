const app = {

  photoset: null,

  init: function() {
    const url = `https://api.flickr.com/services/rest/?
      method=flickr.photosets.getPhotos&
      api_key=426a1c2adbd9c8569c74d4a8973068ba&
      format=json&
      photoset_id=72157626579923453`;
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          const jsonFlickrApi = (object) => object;   // matches the name of wrapper function inside of eval(httpRequest.responseText) 
          app.photoSet = eval(httpRequest.responseText).photoset.photo;
          for (let i = 0; i < app.photoSet.length; i++) {
            app.createImageNode(app.photoSet[i]);
          }
        } else {
          console.err('request failed');
        }
      }
    };
    httpRequest.open('GET', url, true);
    httpRequest.send();
  },

  createImageNode: function({ farm, id, server, secret}, size) {
    const src = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${size || 'n'}.jpg`;
    const tile = document.createElement('div');
    tile.setAttribute('class', 'tile');
    const imageContainer = document.createElement('div');
    imageContainer.setAttribute('class', 'image-container');
    const image = document.createElement('img');
    image.setAttribute('src', src);
    imageContainer.appendChild(image);
    tile.appendChild(imageContainer);
    document.getElementsByClassName('tiles')[0].appendChild(tile);
    return tile;
  },
};

app.init();
