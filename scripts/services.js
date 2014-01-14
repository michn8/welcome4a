
var serviceUrl = 'webService/WebService.asmx/';
//var serviceUrl = 'www.michb.net/health/welcome2/webService/WebService.asmx/';
var record = {};
var recordTemplate;
var recordId;


$('#servicesPage').on('pageinit', function (event) {
    Showloading('show');

    getAllItems();

});


$('#servicesDetailsPage').on('pageshow', function (event) {
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
                url: serviceUrl + 'getService',
                data: '{\'recordId\':\'' + param + '\'}',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                failure: DoFail,
                success: DoSuccess
            });

    Showloading('hide');

}


function getHello() {

    Showloading('show');

  //  var param = id;
    $.ajax(
            {
                type: 'POST',
                url: serviceUrl + 'HelloWorld',
              //  data: '{\'recordId\':\'' + param + '\'}',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                failure: DoFail,
                success: DoSuccess
            });

    Showloading('hide');

}

function DoSuccess(response) {
    alert(response);
    record = response.d;
  //  alert(record);

    var obj2 = response.d;
    // var item = obj[0];
    var obj = $.parseJSON(obj2);
    //  var item = obj;
    var servers = obj[0];
    if (obj.length != 0) {
        // RecordTemplate = item;
        RecordTemplate = obj;
        $.each(servers, function (key, val) {
            //   alert(key + ' ' + value);
            var tag = '#services_' + key;
            //  $(tag).val(value);
           // if (tag == 'eventname') {
            //  alert(tag + '  ' + val);
            if (tag == "#services_date") {
                var newVal = formatDateJson(val);
                $(tag).html(newVal);
            }
            else if (tag == "#services_image") {
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
                url: serviceUrl + 'getAllServices',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                failure: DoFail,
                success: DoSuccessListView
            });

    $.mobile.loading('hide', {
        text: 'Loading Data....',
        textVisible: true
    });

}

function DoSuccessListView(response) {

    $("#services_listview").empty()
    var resp = response.d;
    var obj = $.parseJSON(resp);

    var servers = obj;

    $.each(servers, function (i, row) {
        var placehold = 'sss';
      //  var dateFormatted = formatDateJson(row.date);
        var ItemId = row.id;
        $('#services_listview').append('<li><a href="servicesDetails.html?id=' + ItemId + '" data-transition="none" data-ajax="false">' + row.name + '</a> </li>');

    });
    $('#services_listview').listview('refresh');

    Showloading('hide');
}

function DoFail() {
    alert("fail");
}

