using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
[assembly: OwinStartup(typeof(SISGCA.WEB.Startup))]

namespace SISGCA.WEB
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //var startup = new Seguridad.PRODUCE.config.Startup();
            //startup.ConfigureAuth(app);
        }
    }
}