using HotChocolate;
using HotChocolate.AspNetCore;
using HotChocolate.Execution;
using HotChocolate.Language;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace GraphQLTest
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options
                .AddDefaultPolicy(policy => policy
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()));

            services.AddGraphQL(
                services => SchemaBuilder.New()
                    .AddQueryType<Query>()
                    .Create(),
                queryExecutionBuilder => queryExecutionBuilder
                    .AddSha256DocumentHashProvider(HashFormat.Hex)
                    .UseActivePersistedQueryPipeline());

            services.AddFileSystemQueryStorage();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors();
            app.UseGraphQL("/graphql");
        }
    }
}
