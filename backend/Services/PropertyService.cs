using immobilier_backend.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace immobilier_backend.Services
{
    public class PropertyService
    {
        private readonly IMongoCollection<Property> _propertiesCollection;

        public PropertyService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(
                configuration["MongoDB:ConnectionURI"]);

            var mongoDatabase = mongoClient.GetDatabase(
                configuration["MongoDB:DatabaseName"]);

            _propertiesCollection = mongoDatabase.GetCollection<Property>(
                configuration["MongoDB:CollectionName"]);
        }

        public async Task<List<Property>> GetAsync()
        {
            return await _propertiesCollection.Find(_ => true).ToListAsync();
        }
    }
}