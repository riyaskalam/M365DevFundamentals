//# sourceURL=closures.js

//Call from Console using: closureWithOutTimeout()
function closureWithOutTimeout() {
  debugger;

  var i = 0;
  for (i; i < 3; i++) {
    (function() {
      console.log("counter value in inner function is " + i);
    })();
    console.log("counter value in outer function is " + i);
  }
  console.log("outer function finished");
}

function closureWithTimeout() {
  debugger;

  var i = 0;
  for (i; i < 3; i++) {
    setTimeout(function() {
      console.log("counter value in inner function is " + i);
    }, 1000);
    console.log("counter value in outer function is " + i);
  }
  console.log("outer function finished");
}

function closureWithTimeoutParam() {
  debugger;

  var i = 0;
  for (i; i < 3; i++) {
    setTimeout(
      (function(ct) {
        console.log("counter value is " + ct);
      })(i),
      1000
    );
  }
}

//Call from Console using: getVouchers()
function getVouchers() {
  debugger;

  var sum = 0;
  var voucherIDs = [1, 2, 3, 4];

  voucherIDs.forEach(function(id) {
    $.ajax({
      type: "GET",
      url: "/api/vouchers/" + id,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        //Closure can access a value of an outer function that already finished
        sum += data.Amount;
        console.log("Amount of voucher with id " + id + " : " + data.Amount);
        console.log("Amount after calling voucher with id " + id + " : " + sum);
        debugger;
      },
      error: function(msg) {
        writeLog("GetVouchers query error", msg);
      }
    });
  });

  console.log("Amount after end of code " + sum);
}
