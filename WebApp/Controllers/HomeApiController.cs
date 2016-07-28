using System.IO;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class HomeApiController : ApiController
    {
        public HttpResponseMessage Get()
        {
            var json = File.ReadAllText(
                System.Web.HttpContext.Current.Server.MapPath(@"~/Models/people.json"));
            return new HttpResponseMessage()
            {
                Content = new StringContent(json, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK,
            };
        }

       

        [HttpPost]        
        public string Post(HttpRequestMessage request, [FromBody] Temp temp)
        {
            return "String " + temp.Str + " , Number " + temp.Num;
        }          
     }
}
   