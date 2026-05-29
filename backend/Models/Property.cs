using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace immobilier_backend.Models
{
    [BsonIgnoreExtraElements]
        public class Property
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Entité gestionnaire")]
        public string? EntiteGestionnaire { get; set; }

        [BsonElement("Type de propritété")]
        public string? TypePropriete { get; set; }

        [BsonElement("Référence (Réquisition/Titre foncier/contrat locationà)")]
        public string? Reference { get; set; }

        [BsonElement("Utilisation")]
        public string? Utilisation { get; set; }

        [BsonElement("Code")]
        public string? Code { get; set; }

        [BsonElement("Désignation")]
        public string? Designation { get; set; }

        [BsonElement("Type")]
        public string? Type { get; set; }

        [BsonElement("Montant")]
        public double Montant { get; set; }

        [BsonElement("Ville/Province")]
        public string? Ville { get; set; }

        [BsonElement("Région")]
        public string? Region { get; set; }

        [BsonElement("Pays")]
        public string? Pays { get; set; }

        [BsonElement("Coordonnées GPX  X")]
        public double Latitude { get; set; }

        [BsonElement("Coordonnées GPX  Y")]
        public double Longitude { get; set; }

        [BsonElement("Phtoto 1")]
        public string? Photo { get; set; }
    }
}