namespace PaginaPessoal.Models
{
    public class RepositoryModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Html_Url { get; set; }

        public List<string> Topics { get; set; }
    }
}
