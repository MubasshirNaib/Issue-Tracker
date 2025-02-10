using System.ComponentModel.DataAnnotations;

namespace CRUDWebAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
