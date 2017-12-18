using System.ComponentModel.DataAnnotations;

namespace TeisterMask.Models
{
    using System.Web.Mvc;

    public class Task
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [AllowHtml]
        public string Title { get; set; }

        [Required]
        [AllowHtml]
        public string Status { get; set; }
    }
}
