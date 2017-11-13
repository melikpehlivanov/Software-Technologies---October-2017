using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Blog.Startup))]
namespace Blog
{
    using System.Data.Entity;
    using Migrations;
    using Models;

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<BlogDbContext, Configuration>
                ());

            ConfigureAuth(app);
        }
    }
}
