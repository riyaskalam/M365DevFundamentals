//# sourceURL=promisesJQuery.js

var url = "/api/vouchers";

//Classic Callback Pattern
function doAsyncCall() {
  debugger;

  $.ajax({
    type: "Get",
    url: url,
    dataType: "json",
    async: false, //Change value after first debug - and debug again
    success: function(data) {
      console.log("query executed - response ok", JSON.stringify(data));
    },
    error: function(err) {
      console.log("error ...", err);
    }
  });

  for (var i = 0; i < 100; i++) {
    console.log("Waiting " + i);
  }
}

//Classic Callback Pattern
function useGetJson() {
  debugger;

  $.getJSON(url, function(data) {
    console.log("query executed - response ok", JSON.stringify(data));
  });

  for (var i = 0; i < 100; i++) {
    console.log("Waiting " + i);
  }
}

function mockingPromise() {
  debugger;

  function mockAsyncTask(working) {
    // Return a Promise
    return new Promise((resolve, reject) => {
      // Mock async
      setTimeout(() => {
        if (working) {
          resolve({ result: { working: true } });
        } else {
          reject("Err message: xyz");
        }
      }, 1000);
    });
  }

  mockAsyncTask(true)
    .then(data => console.log("Mock Task Succeeded with data: ", data))
    .catch(err => console.log("Mock Task failed with err msg: ", err));
}

function usingThen() {
  debugger;

  $.getJSON(url, function(data) {
    console.log("query executed - response ok");
    console.log(JSON.stringify(data));
  }).then(function(result) {
    for (var i = 0; i < 100; i++) {
      console.log("Waiting for response to complet .... " + i);
    }
  });
}

// Not recommended
function usingThenSuccessErrror() {
  debugger;

  $.getJSON(url, function(data) {
    console.log("query executed - response ok");
    console.log(JSON.stringify(data));
  }).then(
    function(result) {
      console.log('Entering ".then-branch-success"');
    },
    function(result) {
      console.log('Entering ".then-branch-error"');
    }
  );
}

function usingCatchError() {
  debugger;
  //Execute twice - use an ivalid url 4 second time
  var urlnew = "http://northwind.servicestack.net/customers";

  $.getJSON(urlnew, function(data) {
    console.log("query executed - response ok");
    console.log(JSON.stringify(data));
  })
    .then(function(result) {
      console.log('Entering ".then-branch-success"');
    })
    .catch(function(error) {
      console.log('Entering ".fail-branch"');
    });
}
