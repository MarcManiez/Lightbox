const httpRequest = new XMLHttpRequest();
const url = `https://api.flickr.com/services/rest/?
  method=flickr.photosets.getPhotos&
  api_key=426a1c2adbd9c8569c74d4a8973068ba&
  format=json&photoset_id=72157626579923453`;
let photoSet;

httpRequest.onreadystatechange = function(data) {
  const jsonFlickrApi = function(object) {
    return object;
  };
  photoSet = eval(httpRequest.responseText);
  console.log(photoSet);
};

httpRequest.open('GET', url, true);
httpRequest.send();
