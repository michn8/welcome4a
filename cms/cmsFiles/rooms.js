var recordRoom = {};
var recordTemplateRoom;
var recordIdRoom;
//var needRecordTemplateRoom;

function getItemRoom(id) {

    //  Showloading('show');
    $("#loadingRoom").show();

    var param = id;
    $.ajax(
            {
                type: 'POST',
                url: serviceUrl + 'getRoom',
                data: '{\'recordId\':\'' + param + '\'}',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                failure: DoFail,
                success: DoSuccessRoom
            });

   // Showloading('hide');

}

function DoSuccessRoom(response) {
   // record = response.d;
    //  alert(record);
    //var clearEditor = '';
    //CKEDITOR.instances.editor1.setData(clearEditor, function () {
    //    this.checkDirty();  // true
    //});

    var obj2 = response.d;
    // var item = obj[0];
    var obj = $.parseJSON(obj2);

    // alert(obj);
    //  var item = obj;

    if (obj.length != 0) {
        // RecordTemplate = item;
        var servers = obj[0];
        recordRoom = servers;
        recordTemplateRoom= servers;
        $.each(servers, function (key, val) {
            //   alert(key + ' ' + value);
            var tag = '#txt_tab2_' + key;
            //  $(tag).val(value);
            // if (tag == 'eventname') {
            //  alert(val);
            if (tag == "#txt_tab2_date") {
                var newVal = formatDateJson(val);
                $(tag).val(newVal);
            }
            else if (tag == "#txt_tab2_htmlContent") {
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

    $("#loadingRoom").hide();
}

function getAllRooms() {

   // Showloading('show');
    $("#loadingRoom").show();
    $.ajax(
            {
                type: 'POST',
                url: serviceUrl + 'getAllRooms',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                failure: DoFail,
                success: DoSuccessListViewRoom
            });

    //$.mobile.loading('hide', {
    //    text: 'Loading Data....',
    //    textVisible: true
    //});

}

function DoSuccessListViewRoom(response) {

    if (response != null && response.d != null) {

        var jsonObj2 = $.parseJSON(response.d);
        var tableId;
        tableId = "#tbl_tab2_list";

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

						          var item = '<a href="javascript:getItemRoom(' + "'" + source.id + "'" + ')" >' + source.name + '</a>';
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
    if($('#txt_tab2_id').val()>0)
        {
}
else
    {
        DoTemplateRecordRoom(jsonObj2[0]);
}

    $("#loadingRoom").hide();
}

function DoTemplateRecordRoom(obj2) {

    var obj = obj2;

    if (obj.length != 0) {
        // RecordTemplate = item;
        var servers = obj[0];
        recordRoom = servers;
        recordTemplateRoom = servers;

    }
}


function DoNewRoom() {

    $.each(recordRoom, function (key, val) {
        val = null;
        var tag = '#txt_tab2_' + key;
        if (tag == "#txt_tab2_date") {
            var newVal = null;
            $(tag).val(newVal);
        }
        else if (tag == "#txt_tab2_id") {
            var newVal = '0';
            $(tag).val(newVal);
        }
        else if (tag == "#txt_tab2_htmlContent") {
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

function SaveRoom() {
    $("#loadingRoom").show();
    // $('#loadingDiv').show();

    //  var record = {};
    var record = {};
    var ErrMess = new Array();
    // var SaveForm = true;
    //
    $.each(recordRoom, function (key, val) {
        var tag = '#txt_tab2_' + key;
        if (tag == "#txt_tab2_htmlContent") {
            record[key] = $('#editor1').val();
            var editor_data = CKEDITOR.instances.editor1.getData();
            record[key] = CKEDITOR.instances.editor1.getData();
        }

        else {

            record[key] = $(tag).val();

        }

    });
    //
    var test = record;

    var pkid = $('#txt_tab2_id').val();

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
        url: serviceUrl + "SaveRooms",
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: SuccessSaveRoom,
        error: DoFail

    });




    //else {

    //    $(


    //    '#loadingDiv').hide();

    //    alert(ErrMess[0]);

    //}

}

function SuccessSaveRoom(response) {

    $("#loadingRoom").hide();
  //  alert("room success");
    //   alert(response.d);

}