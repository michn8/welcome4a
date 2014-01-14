using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.WebPages;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.Linq.Expressions;
using System.Reflection;
using System.Data.Entity;
using System.Data.Objects;


/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService {

    public WebService() {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }

    


    [WebMethod]
    public string getAllServices() {


        using (DB_14781_testdbEntities context = new DB_14781_testdbEntities()) {
            var units = (from a in context.health_services
                         orderby a.date ascending
                         select a);

            var ret = units.ToList();

            //  string json = JsonConvert.SerializeObject(ret);
            var jsonSerialiser = new JavaScriptSerializer();
            string json = jsonSerialiser.Serialize(ret);

            return json;

        }
        // return null;

    }

    [WebMethod]
    public string getAllCareers() {


        using (DB_14781_testdbEntities context = new DB_14781_testdbEntities()) {
            var units = (from a in context.health_career
                         orderby a.date ascending
                         select a);

            var ret = units.ToList();

            //  string json = JsonConvert.SerializeObject(ret);
            var jsonSerialiser = new JavaScriptSerializer();
            string json = jsonSerialiser.Serialize(ret);

            return json;

        }
        // return null;

    }
    
    [WebMethod]
    public string getAllRooms() {


        using (DB_14781_testdbEntities context = new DB_14781_testdbEntities()) {
            var units = (from a in context.health_rooms
                         orderby a.date ascending
                         select a);

            var ret = units.ToList();

            //  string json = JsonConvert.SerializeObject(ret);
            var jsonSerialiser = new JavaScriptSerializer();
            string json = jsonSerialiser.Serialize(ret);

            return json;

        }
        // return null;

    }




    [WebMethod]
    public string getService(string recordId) {

        var id = System.Convert.ToInt32(recordId);

        using (DB_14781_testdbEntities context = new DB_14781_testdbEntities()) {
            var units = (from a in context.health_services
                         where a.id == id
                         select a);

            var ret = units.ToList();

            //  string json = JsonConvert.SerializeObject(ret);
            var jsonSerialiser = new JavaScriptSerializer();
            string json = jsonSerialiser.Serialize(ret);

            return json;

        }
        // return null;

    }

    [WebMethod]
    public string getCareer(string recordId) {

        var id = System.Convert.ToInt32(recordId);

        using (DB_14781_testdbEntities context = new DB_14781_testdbEntities()) {
            var units = (from a in context.health_career
                         where a.id == id
                         select a);

            var ret = units.ToList();

            //  string json = JsonConvert.SerializeObject(ret);
            var jsonSerialiser = new JavaScriptSerializer();
            string json = jsonSerialiser.Serialize(ret);

            return json;

        }
        // return null;

    }

    [WebMethod]
    public string getRoom(string recordId) {

        var id = System.Convert.ToInt32(recordId);

        using (DB_14781_testdbEntities context = new DB_14781_testdbEntities()) {

            var units = (from a in context.health_rooms 
                         where a.id == id
                         select a);

            var ret = units.ToList();

            //  string json = JsonConvert.SerializeObject(ret);
            var jsonSerialiser = new JavaScriptSerializer();
            string json = jsonSerialiser.Serialize(ret);

            return json;

        }
        // return null;

    }




    [WebMethod]
    public List<health_services> SaveService(health_services record) {

        int EventId;
        using (DB_14781_testdbEntities context = new DB_14781_testdbEntities()) {
            // incidentId = System.Convert.ToInt32(record.incident_id);

            if (record.id > 0) {
                //save record
                EventId = record.id;

                var query = (from c in context.health_services
                             where c.id == record.id
                             select c);


                foreach (var editRecord in query) {
                    foreach (var prop in query.First().GetType().GetProperties()) {

                        var field = prop.Name;
                        if (field == "EntityState") {
                            break;
                        }

                        if (field != "id") {
                            var ftype = field.GetType();
                            var val = record.GetType().GetProperty(field).GetValue(record, null);
                            //if (field == "incident_id") {
                            //    incidentId = System.Convert.ToInt32(val);
                            //}
                            editRecord.GetType().GetProperty(field).SetValue(editRecord, val, null);
                        }
                    }
                }
                try {
                    context.SaveChanges();
                } catch {
                    throw new Exception("Could not save changes.");
                }
                var items = query.ToList();
                return items;



            } else {
                //do add
                var queryAdd = (from c in context.health_services
                                // where c.pk_id == record.pk_id
                                select c);
                var ret = queryAdd.Take(1).ToList();
                health_services newRec = new health_services();
                foreach (var prop in ret.First().GetType().GetProperties()) {
                    var field = prop.Name;
                    if (field == "EntityState") {
                        break;
                    }

                    if (field != "id") {
                        var ftype = field.GetType();
                        var val = record.GetType().GetProperty(field).GetValue(record, null);
                        // var val = record.GetType().GetProperty(field).GetValue(record);
                        newRec.GetType().GetProperty(field).SetValue(newRec, val,
                        null);
                        if (field == "eventDate") {
                            newRec.GetType().GetProperty(field).SetValue(newRec,
                            DateTime.Now, null);
                        }

                    }
                }

                try {
                    // context.AddTotbl_rptNinetyMinIncident(newRec);
                    context.health_services.Add(newRec);
                    context.SaveChanges();
                } catch {
                    throw new Exception("Could not save changes.");
                }

                var items = queryAdd.ToList();
                return items;
            }


        }

    }

    [WebMethod]
    public List<health_rooms> SaveRooms(health_rooms record) {

        int EventId;
        using (DB_14781_testdbEntities context = new DB_14781_testdbEntities()) {
            // incidentId = System.Convert.ToInt32(record.incident_id);

            if (record.id > 0) {
                //save record
                EventId = record.id;

                var query = (from c in context.health_rooms
                             where c.id == record.id
                             select c);


                foreach (var editRecord in query) {
                    foreach (var prop in query.First().GetType().GetProperties()) {

                        var field = prop.Name;
                        if (field == "EntityState") {
                            break;
                        }

                        if (field != "id") {
                            var ftype = field.GetType();
                            var val = record.GetType().GetProperty(field).GetValue(record, null);
                            //if (field == "incident_id") {
                            //    incidentId = System.Convert.ToInt32(val);
                            //}
                            editRecord.GetType().GetProperty(field).SetValue(editRecord, val, null);
                        }
                    }
                }
                try {
                    context.SaveChanges();
                } catch {
                    throw new Exception("Could not save changes.");
                }
                var items = query.ToList();
                return items;



            } else {
                //do add
                var queryAdd = (from c in context.health_rooms
                                // where c.pk_id == record.pk_id
                                select c);
                var ret = queryAdd.Take(1).ToList();
                health_rooms newRec = new health_rooms();
                foreach (var prop in ret.First().GetType().GetProperties()) {
                    var field = prop.Name;
                    if (field == "EntityState") {
                        break;
                    }

                    if (field != "id") {
                        var ftype = field.GetType();
                        var val = record.GetType().GetProperty(field).GetValue(record, null);
                        // var val = record.GetType().GetProperty(field).GetValue(record);
                        newRec.GetType().GetProperty(field).SetValue(newRec, val,
                        null);
                        if (field == "date") {
                            newRec.GetType().GetProperty(field).SetValue(newRec,
                            DateTime.Now, null);
                        }

                    }
                }

                try {
                    // context.AddTotbl_rptNinetyMinIncident(newRec);
                    context.health_rooms.Add(newRec);
                    context.SaveChanges();
                } catch {
                    throw new Exception("Could not save changes.");
                }

                var items = queryAdd.ToList();
                return items;
            }


        }

    }


    [WebMethod]
    public List<health_career> SaveCareers(health_career record) {

        int EventId;
        using (DB_14781_testdbEntities context = new DB_14781_testdbEntities()) {
            // incidentId = System.Convert.ToInt32(record.incident_id);

            if (record.id > 0) {
                //save record
                EventId = record.id;

                var query = (from c in context.health_career
                             where c.id == record.id
                             select c);


                foreach (var editRecord in query) {
                    foreach (var prop in query.First().GetType().GetProperties()) {

                        var field = prop.Name;
                        if (field == "EntityState") {
                            break;
                        }

                        if (field != "id") {
                            var ftype = field.GetType();
                            var val = record.GetType().GetProperty(field).GetValue(record, null);
                            //if (field == "incident_id") {
                            //    incidentId = System.Convert.ToInt32(val);
                            //}
                            editRecord.GetType().GetProperty(field).SetValue(editRecord, val, null);
                        }
                    }
                }
                try {
                    context.SaveChanges();
                } catch {
                    throw new Exception("Could not save changes.");
                }
                var items = query.ToList();
                return items;



            } else {
                //do add
                var queryAdd = (from c in context.health_career
                                // where c.pk_id == record.pk_id
                                select c);
                var ret = queryAdd.Take(1).ToList();
                health_career newRec = new health_career();
                foreach (var prop in ret.First().GetType().GetProperties()) {
                    var field = prop.Name;
                    if (field == "EntityState") {
                        break;
                    }

                    if (field != "id") {
                        var ftype = field.GetType();
                        var val = record.GetType().GetProperty(field).GetValue(record, null);
                        // var val = record.GetType().GetProperty(field).GetValue(record);
                        newRec.GetType().GetProperty(field).SetValue(newRec, val,
                        null);
                        if (field == "date") {
                            newRec.GetType().GetProperty(field).SetValue(newRec,
                            DateTime.Now, null);
                        }

                    }
                }

                try {
                    // context.AddTotbl_rptNinetyMinIncident(newRec);
                    context.health_career.Add(newRec);
                    context.SaveChanges();
                } catch {
                    throw new Exception("Could not save changes.");
                }

                var items = queryAdd.ToList();
                return items;
            }


        }

    }
}
