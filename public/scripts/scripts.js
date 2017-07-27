function updateItem(element, link) {
  console.log(element.nextSibling.className);
  if (element.nextSibling.className === "card-header-title has-text-success incomplete") {

    var $feedbackOverlay = document.getElementById("feedback-popup");
    $feedbackOverlay.className += " is-active";
    var $sendButton = document.getElementById("send-feedback-button");
    var $notNowButton = document.getElementById("not-now-feedback-button");
    $sendButton.href = link+"&feedback=";
    $notNowButton.href = link;

    element.nextSibling.className = ' card-header-title has-text-success complete'
    element.children[0].firstChild.className = "fa fa-check-square-o"

  } else {
    window.location.replace(link);
    console.log('hi');
    element.nextSibling.className = 'card-header-title has-text-success incomplete'
    element.children[0].firstChild.className = "fa fa-square-o"
  }
}

function addFeedbackTextToLink(text) {
  var $sendButton = document.getElementById("send-feedback-button");
  var string = String(text.value);
  $sendButton.href = document.getElementById("not-now-feedback-button").href+"&feedback=";
  $sendButton.href += string;
}

function closeItemFeedbackPopup() {
  document.getElementById("feedback-popup").className = "modal";
}

function closeListFeedbackPopup() {
  document.getElementById("overall-feedback-popup").className = "modal";
}

function closeGetInTouchPopup() {
  document.getElementById("get-in-touch-popup").className = "modal";
}

function getInTouch() {
  document.getElementById("get-in-touch").className += " none-display-element"
  document.getElementById("update-in-touch").className = " button is-primary"
}

function updateInTouch() {
  let listId = window.location.pathname.slice(7,);
  window.location.replace(window.location.pathname + "/book_face_to_face?listId=" + listId);
}

document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);


  // Check if there are any nav burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
});
