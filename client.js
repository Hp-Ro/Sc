(function () {
  var socket = new WebSocket('ws://127.0.0.1:7769');

  socket.onopen = function (event) {
    console.log('WebSocket opened');
  };

  socket.onmessage = function (event) {
    console.log('Received message from server:', event.data);
    // Process the received message as needed
  };

  socket.onclose = function (event) {
    console.log('WebSocket closed');
  };

  var interval = 10;

  function pollActivity() {
    var $title = document.querySelector(".playbackSoundBadge__titleLink"),
      $progress = document.querySelector(".playbackTimeline__progressWrapper"),
      $play = document.querySelector(".playControls__play");

    if (!$title || !$progress || !$play) {
      console.log("Missing elements");
      return;
    }

    var url = "https://soundcloud.com" + $title.getAttribute("href"),
      pos = parseInt($progress.getAttribute("aria-valuenow"), 10),
      playing = $play.classList.contains("playing");

    if (!playing) {
      console.log("Not playing");
      return;
    }

    console.log("Emitting activity");
    var message = JSON.stringify({ url, pos });
    socket.send(message);
  }

  pollActivity();
  setInterval(pollActivity, interval * 1000);

})();
