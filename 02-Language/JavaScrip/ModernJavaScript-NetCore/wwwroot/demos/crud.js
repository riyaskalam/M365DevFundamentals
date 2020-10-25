//# sourceURL=crud.js

function getVouchers() {
  debugger;

  var url = "/api/vouchers";
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(msg) {
      output("query successful, data received: " + JSON.stringify(msg));
    },
    error: function(msg) {
      output(msg.responseText);
    }
  });
}

function getVoucher() {
  debugger;

  var url = "/api/vouchers/1";
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(msg) {
      output("query successful, data received: " + JSON.stringify(msg));
    },
    error: function(msg) {
      output(msg.responseText);
    }
  });
}

function insertVoucher() {
  debugger;

  var url = "/api/vouchers";
  var data = JSON.stringify({ Text: "Inserted by WebApi", Date: new Date() });

  $.ajax({
    type: "POST",
    data: data,
    url: url,
    contentType: "application/json; charset=utf-8",
    success: function(msg) {
      output("query successful, data received: " + JSON.stringify(msg));
    },
    error: function(msg) {
      output(msg.responseText);
    }
  });
}

function updateVoucher() {
  debugger;

  var id = 1003;
  var url = "/api/vouchers/" + id;
  var vtu = JSON.stringify({
    ID: id,
    Text: "Updated by WebApi",
    Date: "2016-04-22T16:59:32.086",
    Amount: 99,
    Paid: true,
    Expense: false
  });
  $.ajax({
    type: "PUT",
    data: vtu,
    url: url,
    contentType: "application/json; charset=utf-8",
    success: function(msg) {
      output("query successful, voucher updated - id:" + id);
    },
    error: function(msg) {
      output(msg.responseText);
    }
  });
}

function deleteVoucher() {
  debugger;

  var id = 3003;
  var url = "/api/vouchers/" + id;
  $.ajax({
    type: "DELETE",
    url: url,
    contentType: "application/json; charset=utf-8",
    success: function(msg) {
      output("query successful, voucher deleted");
    },
    error: function(msg) {
      output(msg.responseText);
    }
  });
}

function usingFetch() {
  debugger;

  fetch(this.url)
    .then(resp => {
      console.log("Response received from fetch", resp);
      return resp.json();
    })
    .then(data => {
      console.log("Data received from fetch", data);
    });
}

function postFetch() {
  debugger;

  let vouchersapi = "http://localhost:5000/api/vouchers";

  let data = {
    Date: "01.01.2016",
    Amount: 100,
    Text: "Posted Voucher",
    Paid: false
  };

  let options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  fetch(vouchersapi, options)
    .then(function(res) {
      if (res.ok) {
        return res.statusText;
      } else {
        throw Error(`Request rejected with status ${res.status}`);
      }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function usingFetchAwait() {
  debugger;
  async function getFetchedVouchers() {
    let response = await fetch("demos/vouchers.json");
    let voucher = await response.json();
    console.log("Data received using fetch - await");
    console.log(voucher);
  }

  getFetchedVouchers();
}
