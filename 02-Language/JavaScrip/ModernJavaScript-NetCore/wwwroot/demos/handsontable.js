$(document).ready(function() {
    getVouchers();
});

function getVouchers() {
    var url = "/api/vouchers";
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data!=null) {
                var container = document.getElementById('container');
                var hot = new Handsontable(container, {
                    data: data,
                    rowHeaders: true,
                    colHeaders: true,
                    dropdownMenu: true,
                    beforeChange: function (changes, source) {
                        // Validate here
                        // [[row, prop, oldVal, newVal], ...]
                        var editValue = changes[0][3];
                        return editValue!=="notpermitted";
                    },
                    afterChange: function (changes, source) {
                        if (changes!=null) {
                            var editValue = changes[0][3];
                            // Send the changes back to the db using WebApi                        
                        }
                    }
                });
            }
        },
        error: function (msg) {
            output(msg.responseText);
        }
    });
}
