const modal = document.getElementsByClassName('modal')[0];
const close = document.getElementsByClassName('close')[0];

window.onclick = function(event) {
  if (event.target === modal || event.target === close) {
    modal.style.display = 'none';
  }
  if (event.target.parentNode.attributes[1]) {
    const largeImageUrl = event.target.parentNode.attributes[1].nodeValue;
    modal.style.display = 'block';
    modal.getElementsByTagName('img')[0].setAttribute('src', largeImageUrl);
  }
};

const leftArrow = document.getElementsByClassName('left-arrow')[0];
leftArrow.onclick = function(event) {
  const largeImageUrl = event.target.parentNode.children[0].getAttribute('src');
  const currentTile = document.querySelectorAll(`[largeImageUrl="${largeImageUrl}"]`)[0];
  const previousTile = currentTile.parentNode.parentNode.previousSibling;
  if (previousTile.nodeType === 3) return;
  const previousLargeImageUrl = previousTile.children[0].children[0].getAttribute('largeImageUrl');
  modal.getElementsByTagName('img')[0].setAttribute('src', previousLargeImageUrl);
};

const rightArrow = document.getElementsByClassName('right-arrow')[0];
rightArrow.onclick = function(event) {
  const largeImageUrl = event.target.parentNode.children[0].getAttribute('src');
  const currentTile = document.querySelectorAll(`[largeImageUrl="${largeImageUrl}"]`)[0];
  const nextTile = currentTile.parentNode.parentNode.nextSibling;
  if (!nextTile) return;
  const nextLargeImageUrl = nextTile.children[0].children[0].getAttribute('largeImageUrl');
  modal.getElementsByTagName('img')[0].setAttribute('src', nextLargeImageUrl);
};
