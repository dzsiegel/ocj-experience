'use strict';

// Read more/less toggle — adapted from original code by John Margis

const moreButton = '<button class="readMore" onclick="showMore(this)">Read more</button>';
const lessButton = '<button class="readMore" onclick="showMore(this)">Read less</button>';

function AddReadMore() {
  const carLmt = 300;
  const textBlocks = document.getElementsByClassName('readMore');

  for (let i = 0; i < textBlocks.length; i++) {
    if (textBlocks[i].innerText.length > carLmt) {
      const beforeText = textBlocks[i].innerHTML;
      const displayText = beforeText.substring(0, carLmt);
      textBlocks[i].setAttribute('moretext', beforeText);
      textBlocks[i].setAttribute('lesstext', displayText);
      textBlocks[i].setAttribute('minimized', 'true');
      textBlocks[i].innerHTML = displayText + '...\n' + moreButton;
    }
  }
}

function showMore(elem) {
  const node = elem.closest('[moretext]');
  if (node.getAttribute('minimized') === 'true') {
    node.innerHTML = node.getAttribute('moretext') + '...' + lessButton;
    node.setAttribute('minimized', 'false');
  } else {
    node.innerHTML = node.getAttribute('lesstext') + '...' + moreButton;
    node.setAttribute('minimized', 'true');
  }
}

document.addEventListener('DOMContentLoaded', AddReadMore);
