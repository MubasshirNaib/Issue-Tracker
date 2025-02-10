using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CRUDWebAPI.Models
{
    public class UserProfile
    {
        [Key]
        public int UserProfileId { get; set; }
        public int UserId { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }

    }
}
