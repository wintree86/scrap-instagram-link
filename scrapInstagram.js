(function() {
  var result = [];
  var tags = null;
  var clientHeight = 0;
  var scrollValue = 0;
  var location = "";

  function init() {
    clientHeight = document.body.clientHeight;
    document.addEventListener("scroll", catchEvent);
    console.log("start scraping");
    window.scrapingSave = save;
  }

  function catchEvent() {
    var currentScrollValue = document.documentElement.scrollTop;
    CheckLocationChanged();
    if (
      scrollValue < currentScrollValue &&
      currentScrollValue - scrollValue > clientHeight
    ) {
      scrollValue = currentScrollValue;
      getContents();
    }
  }

  function CheckLocationChanged() {
    if (location === "") {
      location = window.location.href;
    } else if (location !== window.location.href) {
      console.log("location changed", location, window.location.href);
      location = window.location.href;
      initData();
    }
  }

  function initData() {
    result = [];
    tags = null;
    scrollValue = 0;
    clientHeight = document.body.clientHeight;
  }

  function getContents() {
    tags = document.getElementsByClassName("v1Nh3 kIKUG  _bz0w");
    insertContents(tags);
    console.log("updated", `${result.length} 개 스크랩`);
  }

  function filterContents(contents) {
    var idx = result.indexOf(contents);
    if (idx === -1) {
      result.push(contents);
      window.scraping = result;
    }
  }

  function insertContents(data) {
    Array.from(data, (tag) => {
      var atag = tag.getElementsByTagName("a");
      filterContents(`${atag[0].href}\n`);
    });
  }
  
  function save() {
    var filename = "result.txt";
    var blob = new Blob([result], { type: "text/plain" });
    var e = document.createEvent("MouseEvents");
    var a = document.createElement("a");
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
    e.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    a.dispatchEvent(e);
  }
  init();
})();