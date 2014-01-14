var serviceUrl = '../../webService/WebService.asmx/';
var record = {};
var recordTemplate;
var recordId;




function getAllItems() {

    // Showloading('show');

    $.ajax(
            {
                type: 'POST',
                url: serviceUrl + 'getAllServices',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                failure: DoFail,
                success: DoSuccessTable
            });

    $.mobile.loading('hide', {
        text: 'Loading Data....',
        textVisible: true
    });

}

function DoFail() {

}

function DoSuccessTable(response) {
    //     alert(response);
    if (response != null && response.d != null) {

        var jsonObj2 = $.parseJSON(response.d);
        var tableId;
        tableId = "#tbl_services_list";
     
        var pId;
        var pEvent;

        var oTable = $(tableId).dataTable({
            "bProcessing": true,
            "sScrollY": "300px",
            "bJQueryUI": true,
            "iDisplayLength": 50,
            "bScrollCollapse": true,
            "bWidth":200,
            "bDestroy": true,
            "aaSorting": [[0, "desc"]],
            "aaData": jsonObj2,
            "aoColumns": [
     

                            { "mData": "id" },
              
						  {

						      "mData": function (source, type, val) {
						          //   source = "name";

						          var item = '<a href="javascript:getService(' + "'" + source.id + "'" + ')" >' + source.name + '</a>';
						                   return item;

						  },

						  },
   
                        {
                            "mData": "date",
                            "mRender": function (data, type, row) {
                             //   return data + ' ' + row[3];
                                var d = formatDateJson(data);
                                return d;
                            },
                        },
						{ "mData": "contact" }
            ]
        });

    }
}



function getService(id) {

 //   Showloading('show');

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

 //   Showloading('hide');

}
function DoSuccess(response) {

    record = response.d;
    //  alert(record);

    var obj2 = response.d;
    // var item = obj[0];
    var obj = $.parseJSON(obj2);

   // alert(obj);
    //  var item = obj;
    var servers = obj[0];
    if (obj.length != 0) {
        // RecordTemplate = item;
        RecordEdit = servers;
        RecordTemplate = servers;
        $.each(servers, function (key, val) {
            //   alert(key + ' ' + value);
            var tag = '#txt_services_' + key;
            //  $(tag).val(value);
            // if (tag == 'eventname') {
            //  alert(val);
            if (tag == "#txt_services_date") {
                var newVal = formatDateJson(val);
                $(tag).val(newVal);
            }
            else if (tag == "#txt_services_htmlContent") {
                // $(tag).attr("src", val);
               // $(tag).html(val);
                CKEDITOR.instances.services_editor1.setData(val, function () {
                    this.checkDirty();  // true
                });
            }
            else {
                $(tag).val(val);
            }
            //   }

        });

    }
   // Showloading('hide');
}


function SaveEvent() {

    // $('#loadingDiv').show();

    //  var record = {};
   var record = {};
    var ErrMess = new Array();
    // var SaveForm = true;
    //
    $.each(RecordEdit, function (key, val) {
        var tag = '#txt_' + key;
        if (tag == "#txt_htmlContent") {
            record[key] = $('#editor1').val();
            var editor_data = CKEDITOR.instances.editor1.getData();
            record[key] = CKEDITOR.instances.editor1.getData();
        }

        else {

        record[key] = $(tag).val();

      //  alert($(tag).val());
         }

    });
    //
    var test = record;

    var pkid = $('#txt_id').val();

    if (pkid == "" || pkid == null) {
        record.pk_id = 0;
    }

    //validations
    //$.each(NinetyRecord, function (key, val) {

    //    var tag = '#' + key;
    //    var testNum = $(tag).val();
    //    if (key == "initialEstClearance") {

    //        if (isNaN(testNum)) {

    //            SaveForm = false;
    //            var element = "initialEstClearance Command requires a numeric entry";
    //            ErrMess.push(element);
    //        }
    //    }

    //});
    var param = JSON.stringify({ "record": record })

    //  var pageUrl = "http://tdotr3ie10.gf-locate.com/Webservices/WebService1.asmx";;

    // if (SaveForm == true)

    $.ajax({
        type: "POST",
        url: serviceUrl + "SaveEvent",
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: SuccessSave,
        error: DoFail

    });




    //else {

    //    $(


    //    '#loadingDiv').hide();

    //    alert(ErrMess[0]);

    //}

}

function SuccessSave(response) {
    alert("edit items success");
 //   alert(response.d);

}

function formatDateJson(pDate) {

    var dateVal = pDate;
    var date = new Date(parseFloat(dateVal.substr(6)));
    var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    return dateString;

}