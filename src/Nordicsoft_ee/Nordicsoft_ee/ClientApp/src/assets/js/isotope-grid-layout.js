
// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  layoutMode: 'masonry',
  masonry: {
    columnWidth: 110
  },
  cellsByRow: {
    columnWidth: 220,
    rowHeight: 220
  },
  masonryHorizontal: {
    rowHeight: 110
  },
  cellsByColumn: {
    columnWidth: 220,
    rowHeight: 220
  }
});

var isHorizontal = false;
var $window = $( window );
