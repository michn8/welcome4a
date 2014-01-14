var DoingSetup = true;
var CurrentTab = '#tab-1';

var serviceUrl = '../../webService/WebService.asmx/';
//var record = {};
//var recordTemplate;
//var recordId;


$(function () {
    $("#loading").show();
    DoingSetup = true;
    // Handler for .ready() called.
   // alert("load");
    $(".tabs-menu a").click(function (event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();

        CurrentTab = tab;

        switch (CurrentTab) {
            case '#tab-1':
                getAllServices();
            case '#tab-2':
                getAllRooms();
            case '#tab-3':
                getAllCareers();
            default:
                //   return kendo.toString(date, "F");
        }

    });

    getAllServices();
   
});

function Setup2() {
 //   getAllEvents();
    DoingSetup = false;
}


function DoEdit() {
    switch (CurrentTab) {
        case '#tab-1':
            DoEditServices();
            break;
        case '#tab-2':
            DoEditRooms();
            break;
        case '#tab-3':
            DoEditCareers();
            break;
        default:
            break;
            //   return kendo.toString(date, "F");
    }

    //var vtext = $('#editor1').val();
    //alert(vtext);

    //SaveEvent();

}

function DoSave() {

    switch (CurrentTab) {
        case '#tab-1':
            SaveService();
        case '#tab-2':
            SaveRoom();
        case '#tab-3':
            SaveCareer();
        default:
            //   return kendo.toString(date, "F");
    }

   // var vtext = $('#services_editor1').val();
 //   alert(vtext);


}

function formatDateJson(pDate) {

    var dateVal = pDate;
    var date = new Date(parseFloat(dateVal.substr(6)));
    var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    return dateString;

}
