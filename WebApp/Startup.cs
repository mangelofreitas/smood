using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Piclima.Projetos.WebApp
{
    public class Startup
    {
        #region Public Methods

        public Startup(IHostingEnvironment env)
        {
            new ConfigurationBuilder()
                //.AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .Build();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(minLevel: LogLevel.Information);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
        }

        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                 .UseKestrel()
                 .UseContentRoot(Directory.GetCurrentDirectory())
                 .UseIISIntegration()
                 .UseStartup<Startup>()
//#if DEBUG
//                 .UseUrls("http://localhost:8046")
//#endif
                 .Build();

            host.Run();
        }

        #endregion
    }
}
