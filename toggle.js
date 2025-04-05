document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll(".custom-item");
  items.forEach(function (item) {
    var header = item.querySelector(".custom-item-header");
    if (header) {
      header.addEventListener("click", function () {
        item.classList.toggle("active");
      });
    }
  });
});
