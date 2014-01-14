
var serviceUrl = 'webService/WebService.asmx/';
var record = {};
var recordTemplate;
var recordId;


$('#roomsPage').on('pageinit', function (event) {
    Showloading('show');

    getAllItems();

});


$('#roomsDetailsPage').on('pageshow', function (event) {
    Showloading('show');
    recordId = getUrlVars()["id"];
    //   alert(eventId);
    if (recordId > 0) {
        getItem(recordId);
    }

});



function getItem(id) {

    Showloading('show');

    var param = id;
    $.ajax(
            {
                type: 'POST',
                url: serviceUrl + 'getRoom',
                data: '{\'recordId\':\'' + param + '\'}',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                failure: DoFail,
                success: DoSuccess
            });

    Showloading('hide');

}

function DoSuccess(response) {

    record = response.d;
    var resp = response.d;
    var obj = $.parseJSON(resp);
    var servers = obj[0];
    if (obj.length != 0) {
        // RecordTemplate = item;
        RecordTemplate = obj;
        $.each(servers, function (key, val) {

            var tag = '#rooms_' + key;
            if (tag == "#rooms_date") {
                var newVal = formatDateJson(val);
                $(tag).html(newVal);
            }
            else if (tag == "#rooms_image") {
                $(tag).attr("src", val);
            }
            else {
                $(tag).html(val);
            }
         //   }

        });

    }
    Showloading('hide');

}

function getAllItems() {

   // Showloading('show');

    $.ajax(
            {
                type: 'POST',
                // url: '/WebForm4a.aspx/TestMethod',
                url: serviceUrl + 'getAllRooms',
              //  data: '{\'eventId\':\'' + param + '\'}',
                //  data: '{\'inputText\':\'' + 'testttttttttttt stuff here' + '\'}',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                failure: DoFail,
                success: DoSuccessListView
            });

    $.mobile.loading('hide', {
        text: 'Loading Data....',
        textVisible: true
    });
  //  Showloading('hide');

}

function DoSuccessListView(response) {

    $("#rooms_listview").empty()
  //  record = response.d;
    var resp = response.d;
    var obj = $.parseJSON(resp);

    var servers = obj;

    $.each(servers, function (i, row) {

        var dateFormatted = formatDateJson(row.date);
        var ItemId = row.id;
 
     //   $('#news_listview').append('<li><a href="EventsDetails.html?id=' + ItemId + '" data-transition="none"><img src="' + row.image + '"/><h3>' + row.name + '</h3><p>' + dateFormatted + '</p></a></li>');
        $('#rooms_listview').append('<li><a href="roomsDetails.html?id=' + ItemId + '" data-transition="none"><h3>' + row.name + '</h3><p>' + dateFormatted + '</p></a></li>');
    });
    $('#rooms_listview').listview('refresh');

    Showloading('hide');
}

function DoFail() {
    alert("fail");
}

