(function () {
  'use strict';

  var page = document.getElementById('hubOverviewPage');
  if (!page) return;

  page.dataset.ready = 'true';

  page.querySelectorAll('.hub-action-btn, .btn, .open-link, .hub-recent__action').forEach(function (node) {
    node.addEventListener('click', function (event) {
      if (node.tagName === 'A') return;
      event.preventDefault();
    });
  });
})();
