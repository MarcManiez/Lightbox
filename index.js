const httpRequest = new XMLHttpRequest();
const url = `https://api.flickr.com/services/rest/?
  method=flickr.photosets.getPhotos&
  api_key=426a1c2adbd9c8569c74d4a8973068ba&
  format=json&
  photoset_id=72157626579923453`;
let photoSet;

const createPictureNode = function({ farm, id, server, secret}, size) {
  const tile = document.createElement('div');
  tile.setAttribute('class', 'tile');
  const imageContainer = document.createElement('div');
  imageContainer.setAttribute('class', 'image-container');
  const image = document.createElement('img');
  image.setAttribute('src', 'https://farm4.staticflickr.com/3492/5713357208_a164f169c6_n.jpg');
  imageContainer.appendChild(image);
  tile.appendChild(imageContainer);
  document.getElementsByClassName('tiles')[0].appendChild(tile);
  return tile;
};

httpRequest.onreadystatechange = function(data) {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      const jsonFlickrApi = (object) => object;
      photoSet = eval(httpRequest.responseText);
      console.log(photoSet);
    } else {
      console.err('request failed');
    }
  }
};

httpRequest.open('GET', url, true);
httpRequest.send();
