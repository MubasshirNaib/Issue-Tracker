using CRUDWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAPIController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserAPIController(AppDbContext context)
        {
            _context = context;
        }
        // POST: /api/user
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                //return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);
                return Ok("Done");
            }
            catch
            {
                await transaction.RollbackAsync();
                return BadRequest("Error creating user.");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetUserData()
        {
            var user = await _context.Users.Include(u => u.UserProfile).ToListAsync();

            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }
        // GET: /api/UserAPI/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users.Include(u => u.UserProfile).FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }

        // PUT: /api/user/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var user = await _context.Users.Include(u => u.UserProfile).FirstOrDefaultAsync(u => u.UserId == id);

                if (user == null)
                    return NotFound("User not found.");

                // Update user details
                user.UserName = updatedUser.UserName;
                user.Email = updatedUser.Email;

                // Update profile details
                if (user.UserProfile != null)
                {
                    user.UserProfile.Address = updatedUser.UserProfile.Address;
                    user.UserProfile.Phone = updatedUser.UserProfile.Phone;
                }

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return Ok(user);
            }
            catch
            {
                await transaction.RollbackAsync();
                return BadRequest("Error updating user.");
            }
        }

        // DELETE: /api/user/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var user = await _context.Users.Include(u => u.UserProfile).FirstOrDefaultAsync(u => u.UserId == id);

                if (user == null)
                    return NotFound("User not found.");

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return NoContent();
            }
            catch
            {
                await transaction.RollbackAsync();
                return BadRequest("Error deleting user.");
            }
        }
    }

}

