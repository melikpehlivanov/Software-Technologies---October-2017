using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace AnimeList.Models
{
    public class Anime
    {
        public int Id { get; set; }

        [Required]
        public int Rating { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Watched { get; set; }
    }
}