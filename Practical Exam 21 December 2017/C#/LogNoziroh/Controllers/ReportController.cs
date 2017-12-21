namespace LogNoziroh.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Web.Mvc;
    using Models;

    [ValidateInput(false)]
    public class ReportController : Controller
    {
        [HttpGet]
        [Route("")]
        public ActionResult Index()
        {
            using (var db = new LogNozirohDbContext())
            {
                var reports = db.Reports.ToList();
                return View(reports);
            }
            return View();
        }

        [HttpGet]
        [Route("details/{id}")]
        public ActionResult Details(int id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            
            using (var db = new LogNozirohDbContext())
            {
                var rep = db.Reports              
                    .Where(a => a.Id == id)
                    .First();

  
                if (rep == null)
                {
                    return HttpNotFound();
                }

                return View(rep);

            }
        }

        [HttpGet]
        [Route("create")]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [Route("create")]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Report report)
        {
            if (ModelState.IsValid)
            {
                using (var db = new LogNozirohDbContext())
                {
                    db.Reports.Add(report);
                    db.SaveChanges();
                    return Redirect("/");
                }
            }
            return View();
        }

        [HttpGet]
        [Route("delete/{id}")]
        public ActionResult Delete(int id)
        {
            using (var db = new LogNozirohDbContext())
            {
                var report = db.Reports.Find(id);
                if (report == null)
                {
                    return RedirectToAction("index");
                }
                return View(report);
            }
        }

        [HttpPost]
        [Route("delete/{id}")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirm(int id, Report reportModel)
        {
            using (var db = new LogNozirohDbContext())
            {
                var film = db.Reports.Find(id);
                if (film == null)
                {
                    return RedirectToAction("Index");
                }
                db.Reports.Remove(film);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
        }
    }
}