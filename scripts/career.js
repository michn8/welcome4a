
var serviceUrl = 'webService/WebService.asmx/';
var record = {};
var RecordTemplate;
var newsId;


$('#careerPage').on('pageinit', function (event) {
    Showloading('show');

    getAllItems();

});




$('#careersDetailsPage').on('pageshow', function (event) {
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
                // url: '/WebForm4a.aspx/TestMethod',
                url: serviceUrl + 'getCareer',
                data: '{\'recordId\':\'' + param + '\'}',
                //  data: '{\'inputText\':\'' + 'testttttttttttt stuff here' + '\'}',
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

            var tag = '#careers_' + key;
            if (tag == "#careers_date") {
                var newVal = formatDateJson(val);
                $(tag).html(newVal);
            }
            else if (tag == "#careers_image") {
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

    $.ajax(
            {
                type: 'POST',
                url: serviceUrl + 'getAllCareers',
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

    $("#careers_listview").empty()
  //  record = response.d;
    var resp = response.d;
    var obj = $.parseJSON(resp);

    var servers = obj;

    $.each(servers, function (i, row) {

        var dateFormatted = formatDateJson(row.date);
        var ItemId = row.id;
 
     //   $('#news_listview').append('<li><a href="EventsDetails.html?id=' + ItemId + '" data-transition="none"><img src="' + row.image + '"/><h3>' + row.name + '</h3><p>' + dateFormatted + '</p></a></li>');
        $('#careers_listview').append('<li><a href="CareerDetails.html?id=' + ItemId + '" data-transition="none" data-ajax="false"><h3>' + row.name + '</h3><p> Date Available: ' + dateFormatted + '</p></a></li>');
    });
    $('#careers_listview').listview('refresh');

    Showloading('hide');
}

function DoFail() {
    alert("fail");
}

