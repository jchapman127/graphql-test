namespace GraphQLTest
{
    public class Query
    {
        public string GetGreeting(string? name) => $"Hello, {name ?? "World"}!";
    }
}
