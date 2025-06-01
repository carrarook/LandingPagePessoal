using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PaginaPessoal.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly GitHubService _gitHubService;

    public ProjectsController(GitHubService gitHubService)
    {
        _gitHubService = gitHubService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectViewModel>>> GetProjects()
    {
        var repositories = await _gitHubService.GetRepositoriesAsync();
        var projectViewModels = new List<ProjectViewModel>();

        foreach (var repo in repositories)
        {
            projectViewModels.Add(new ProjectViewModel
            {
                Name = repo.Name,
                Description = repo.Description,
                HtmlUrl = repo.Html_Url,
                // ReadmeContent removido
            });
        }

        return Ok(projectViewModels);
    }
}

public class ProjectViewModel
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string HtmlUrl { get; set; }
    // public string ReadmeContent { get; set; } removido
}