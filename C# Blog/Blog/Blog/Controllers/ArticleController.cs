using System.Web.Mvc;

namespace Blog.Controllers
{
    using System.Data.Entity;
    using System.Linq;
    using System.Net;
    using Models;

    public class ArticleController : Controller
    {
        // GET
        public ActionResult Index()
        {
            return RedirectToAction("List");
        }

        public ActionResult List()
        {
            using (var db = new BlogDbContext())
            {
                var articles = db.Articles
                    .Include(a => a.Author)
                    .ToList();

                return View(articles);
            }
        }

        // GET: Article/Details
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            using (var db = new BlogDbContext())
            {
                var article = db.Articles
                    .Where(a => a.Id == id)
                    .Include(a => a.Author)
                    .First();

                if (article == null)
                {
                    return HttpNotFound();
                }

                return View(article);
            }
        }

        [Authorize]
        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [Authorize]
        [HttpPost]
        public ActionResult Create(Article article)
        {
            if (ModelState.IsValid)
            {
                using (var db = new BlogDbContext())
                {
                    // Get author id
                    var authorId = db.Users
                        .Where(u => u.UserName == this.User.Identity.Name)
                        .First()
                        .Id;

                    // Set articles author
                    article.AuthorId = authorId;
                    //Save article in DB
                    db.Articles.Add(article);
                    db.SaveChanges();

                    return RedirectToAction("Index");
                }

            }
            return View(article);
        }

        [Authorize]
        [HttpGet]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            using (var db = new BlogDbContext())
            {
                // Get article from database
                var article = db.Articles
                    .Where(a => a.Id == id)
                    .Include(a => a.Author)
                    .First();

                // Check if this user is the author of the article
                if (!IsUserAuthorizedToEdit(article))
                {
                    return new HttpStatusCodeResult(HttpStatusCode.Forbidden);
                }

                // Check if article exists
                if (article == null)
                {
                    return HttpNotFound();
                }

                // Pass article to view
                return View(article);
            }
        }

        [Authorize]
        [HttpPost]
        [ActionName("Delete")]
        public ActionResult DeleteConfirmed(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            using (var db = new BlogDbContext())
            {
                // Get article from database
                var article = db.Articles
                    .Where(a => a.Id == id)
                    .Include(a => a.Author)
                    .First();

                // Check if article exists
                if (article == null)
                {
                    return HttpNotFound();
                }

                // Delete article from database
                db.Articles.Remove(article);
                db.SaveChanges();

                // Redirect to index page
                return RedirectToAction("Index");
            }
        }

        [Authorize]
        [HttpGet]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            using (var db = new BlogDbContext())
            {
                // Get article from database
                var article = db.Articles
                    .Where(a => a.Id == id)
                    .Include(a => a.Author)
                    .First();

                // Check if this user is the author of the article
                if (!IsUserAuthorizedToEdit(article))
                {
                    return new HttpStatusCodeResult(HttpStatusCode.Forbidden);
                }

                // Check if article exists
                if (article == null)
                {
                    return HttpNotFound();
                }

                // Create the view model
                var model = new ArticleViewModel();
                model.Id = article.Id;
                model.Title = article.Title;
                model.Content = article.Content;

                // Pass the view model to view
                return View(model);
            }
        }

        [Authorize]
        [HttpPost]
        [ActionName("Edit")]
        public ActionResult EditConfirmed(ArticleViewModel model)
        {
            // Check if model is valid
            if (ModelState.IsValid)
            {
                using (var db = new BlogDbContext())
                {
                    // Get article from database
                    var article = db.Articles
                        .Where(a => a.Id == model.Id)
                        .First();

                    // Set article properties
                    article.Title = model.Title;
                    article.Content = model.Content;
                    // Save article state in database
                    db.Entry(article).State = EntityState.Modified;
                    db.SaveChanges();

                    // Redirect to the index Page
                    return RedirectToAction("Index");
                }

            }
            // If model state is invalid, return the same view
            return View(model);
        }

        private bool IsUserAuthorizedToEdit(Article article)
        {
            bool isAdmin = this.User.IsInRole("Admin");
            bool isAuthor = article.IsAuthor(this.User.Identity.Name);

            return isAuthor || isAdmin;
        }
    }
}