var serviceUrl = '../../webService/WebService.asmx/';
var news_record = {};
var news_RecordTemplate;
var news_RecordEdit = {};
var news_Id;



function getAllNews() {

    // Showloading('show');

    $.ajax(
            {
                type: 'POST',
                // url: '/WebForm4a.aspx/TestMethod',
                url: serviceUrl + 'getAllNews',
                //  data: '{\'eventId\':\'' + param + '\'}',
                //  data: '{\'inputText\':\'' + 'testttttttttttt stuff here' + '\'}',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                failure: DoFailNews,
                success: DoSuccessTableNews
            });

    $.mobile.loading('hide', {
        text: 'Loading Data....',
        textVisible: true
    });
    //  Showloading('hide');

}

function DoFailNews() {

}

function DoSuccessTableNews(response) {
    //     alert(response);
    if (response != null && response.d != null) {

        var jsonObj2 = $.parseJSON(response.d);
        var tableId;
        tableId = "#tbl_news_list";
     
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
     
					//	{

                            { "mData": "id" },
                          //  { "mData": "name" },

						
						  {
						      // "aTargets": [1],
                            //  var d = 

						      "mData": function (source, type, val) {
						          //   source = "name";

						          var item = '<a href="javascript:getNews(' + "'" + source.id + "'" + ')" >' + source.name + '</a>';
						                   return item;

						  },

						  },
   

						//{ "mData": "descrip" },
                        {
                            "mData": "date",
                            //"fnRender": function (o, val) {
                            //    var d = formatDateJson(val);
                            //    return d;
                            //},

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

    if (DoingSetup == true) {
        Setup2();
    }

    }




function getNews(id) {

  //  Showloading('show');

    var param = id;
    $.ajax(
            {
                type: 'POST',
                // url: '/WebForm4a.aspx/TestMethod',
                url: serviceUrl + 'getNews',
                data: '{\'newsId\':\'' + param + '\'}',
                //  data: '{\'inputText\':\'' + 'testttttttttttt stuff here' + '\'}',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                failure: DoFailNews,
                success: DoSuccessNews
            });

 //   Showloading('hide');

}

function DoSuccessNews(response) {

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
            var tag = '#txt_news_' + key;
            //  $(tag).val(value);
            // if (tag == 'eventname') {
            //  alert(val);
            if (tag == "#txt_news_date") {
                var newVal = formatDateJson(val);
                $(tag).val(newVal);
            }
            else if (tag == "#txt_news_htmlContent") {
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
   // Showloading('hide');
}


function SaveNews() {

    // $('#loadingDiv').show();

    //  var record = {};
   var record = {};
    var ErrMess = new Array();
    // var SaveForm = true;
    //
    $.each(RecordEdit, function (key, val) {
        var tag = '#txt_news_' + key;
        if (tag == "#txt_news_htmlContent") {
            record[key] = $('#news_editor1').val();
            var editor_data = CKEDITOR.instances.news_editor1.getData();
            record[key] = CKEDITOR.instances.news_editor1.getData();
        }

        else {

        record[key] = $(tag).val();

      //  alert($(tag).val());
         }

    });
    //
    var test = record;

    var pkid = $('#txt_news_id').val();

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
        url: serviceUrl + "SaveNews",
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: SuccessSaveNews,
        error: DoFailNews

    });




    //else {

    //    $(


    //    '#loadingDiv').hide();

    //    alert(ErrMess[0]);

    //}

}

function SuccessSaveNews(response) {
    alert(" news edit success");
 //   alert(response.d);

}

function formatDateJson(pDate) {

    var dateVal = pDate;
    var date = new Date(parseFloat(dateVal.substr(6)));
    var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    return dateString;

}