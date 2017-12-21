using System.ComponentModel.DataAnnotations;

namespace LogNoziroh.Models
{
    using System.Web.Mvc;

    public class Report
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [AllowHtml]
        public string Status { get; set; }
        [Required]
        [AllowHtml]
        public string Message { get; set; }
        [Required]
        [AllowHtml]
        public string Origin { get; set; }
       
    }
}