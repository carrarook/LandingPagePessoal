using Microsoft.OpenApi.Models; // Adicionado para o Swagger
using PaginaPessoal.Models;  // Removido - agora em pastas separadas

// Método Main (Program.cs)
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllersWithViews();

// Adiciona serviços ao contêiner.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>  // Configuração do Swagger
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Sua API de Projetos", Version = "v1" });
});

// Configuração do HttpClient e GitHubService
builder.Services.AddHttpClient<GitHubService>();
builder.Services.Configure<GitHubSettingsModel>(builder.Configuration.GetSection("GitHub"));

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://SEU_DOMINIO_DO_FRONTEND") // Substitua pelo domínio do seu frontend
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// DESCOMENTAR ANTES DE PROD
//var port = Environment.GetEnvironmentVariable("PORT") ?? "80";
//app.Urls.Add($"http://*:{port}");



// Configura o pipeline de requisições HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseCors(); // Aplica a política de CORS
app.UseRouting();
app.UseAuthorization();
app.MapControllerRoute( // Configura o roteamento
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapControllers();

app.Run();
