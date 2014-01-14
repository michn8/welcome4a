var recordService = {};
var recordTemplateService;
var recordIdService;

function getItemService(id) {

    //  Showloading('show');
    $("#loadingService").show();

    var param = id;
    $.ajax(
            {
                type: 'POST',
                url: serviceUrl + 'getService',
                data: '{\'recordId\':\'' + param + '\'}',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                failure: DoFail,
                success: DoSuccessService
            });

  //  Showloading('hide');

}

function DoSuccessService(response) {
   // record = response.d;
    //  alert(record);
    //clear editor
    //var clearEditor = '';
    //CKEDITOR.instances.editor1.setData(clearEditor, function () {
    //   // this.checkDirty();  // true
    //});

    var obj2 = response.d;
    // var item = obj[0];
    var obj = $.parseJSON(obj2);

    // alert(obj);
    //  var item = obj;
    var servers = obj[0];
    if (obj.length != 0) {
        // RecordTemplate = item;
        recordService = servers;
        recordTemplateService = servers;
        $.each(servers, function (key, val) {
            //   alert(key + ' ' + value);
            var tag = '#txt_tab1_' + key;
            //  $(tag).val(value);
            // if (tag == 'eventname') {
            //  alert(val);
            if (tag == "#txt_tab1_date") {
                var newVal = formatDateJson(val);
                $(tag).val(newVal);
            }
            else if (tag == "#txt_tab1_htmlContent") {
                // $(tag).attr("src", val);
                // $(tag).html(val);
                CKEDITOR.instances.editor1.setData(val, function () {
                    this.checkDirty();  // true
                });
            }
            else {
                $(tag).val(val);
            }
            //   }

        });

    }
    $("#loadingService").hide();
}

function getAllServices() {

    $("#loadingService").show();
   // Showloading('show');

    $.ajax(
            {
                type: 'POST',
                url: serviceUrl + 'getAllServices',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                failure: DoFail,
                success: DoSuccessListViewService
            });

    //$.mobile.loading('hide', {
    //    text: 'Loading Data....',
    //    textVisible: true
    //});

}

function DoSuccessListViewService(response) {

    if (response != null && response.d != null) {

        var jsonObj2 = $.parseJSON(response.d);
        var tableId;
        tableId = "#tbl_tab1_list";

        var pId;
        var pEvent;

        var oTable = $(tableId).dataTable({
            "bProcessing": true,
            "sScrollY": "300px",
            "bJQueryUI": true,
            "iDisplayLength": 50,
            "bScrollCollapse": true,
            "bWidth": 400,
            "bDestroy": true,
            "aaSorting": [[0, "desc"]],
            "aaData": jsonObj2,
            "aoColumns": [


                            { "mData": "id" },

						  {

						      "mData": function (source, type, val) {
						          //   source = "name";

						          var item = '<a href="javascript:getItemService(' + "'" + source.id + "'" + ')" >' + source.name + '</a>';
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

    //  if (recordTemplateRoom == 'undefined' || recordTemplateRoom == null) {
    if ($('#txt_tab1_id').val() > 0) {
    }
    else {
        DoTemplateRecordService(jsonObj2[0]);
    }

    $("#loadingService").hide();
}

function DoTemplateRecordService(obj2) {

    var obj = obj2;

    if (obj.length != 0) {
        // RecordTemplate = item;
        var servers = obj[0];
        recordService = servers;
        recordTemplateService = servers;

    }
}


function DoNewService() {

    $.each(recordService, function (key, val) {
        val = null;
        var tag = '#txt_tab1_' + key;
        if (tag == "#txt_tab1_date") {
            var newVal = null;
            $(tag).val(newVal);
        }
        else if (tag == "#txt_tab1_id") {
            var newVal = '0';
            $(tag).val(newVal);
        }
        else if (tag == "#txt_tab1_htmlContent") {
            CKEDITOR.instances.editor1.setData(val, function () {
                this.checkDirty();  // true
            });
        }
        else {
            $(tag).val(val);
        }

    });

    // $('#btn_Add_room').attr("disabled", 'disabled');

}

function DoFail() {
    alert("fail");
}

function SaveService() {
    $("#loadingService").show();
    // $('#loadingDiv').show();
 //   alert("do save");
    //  var record = {};
    var record = {};
    var ErrMess = new Array();
    // var SaveForm = true;
    //
    $.each(recordService, function (key, val) {
        var tag = '#txt_tab1_' + key;
        if (tag == "#txt_tab1_htmlContent") {
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

    var pkid = $('#txt_tab1_id').val();

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
        url: serviceUrl + "SaveService",
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: SuccessSaveService,
        error: DoFail

    });




    //else {

    //    $(


    //    '#loadingDiv').hide();

    //    alert(ErrMess[0]);

    //}

}

function SuccessSaveService(response) {
 //   alert("success");
    //   alert(response.d);
    $("#loadingService").hide();
}