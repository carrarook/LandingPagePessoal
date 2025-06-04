using PaginaPessoal.Models;
using System.Net.Http.Headers;
using System.Text.Json;

public class GitHubService
{
    private readonly HttpClient _httpClient;
    private readonly string _githubUsername;
    private readonly string _githubToken;

    public GitHubService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github+json"));
        _httpClient.DefaultRequestHeaders.UserAgent.TryParseAdd("Your-App-Name"); // Substitua pelo nome da sua aplicação

        // Removendo a dependência de IConfiguration e usando valores padrão fixos para teste
        _githubUsername = "carrarook";
        _githubToken = "";

        if (!string.IsNullOrEmpty(_githubToken))
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _githubToken);
        }
    }

    public async Task<List<RepositoryModel>> GetRepositoriesAsync()
    {
        try
        {
            var response = await _httpClient.GetAsync($"https://api.github.com/users/{_githubUsername}/repos");
            response.EnsureSuccessStatusCode(); // Lança exceção para status de erro
            var repositories = await JsonSerializer.DeserializeAsync<List<RepositoryModel>>(await response.Content.ReadAsStreamAsync(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            return repositories;
        }
        catch (HttpRequestException ex)
        {
            // Registre o erro ou lance uma exceção personalizada para tratamento no Controller
            Console.Error.WriteLine($"Erro ao chamar a API do GitHub: {ex.Message}");
            throw; // Re-lança a exceção para o Controller tratar
        }
        catch (JsonException ex)
        {
            Console.Error.WriteLine($"Erro ao desserializar JSON: {ex.Message}");
            throw;
        }

    }
}