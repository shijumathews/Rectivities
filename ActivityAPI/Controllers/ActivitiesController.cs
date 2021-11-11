using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistance;
 

namespace ActivityAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : BaseApiController
    {
       

        [HttpGet]
        [ActionName("Activities")]

        public async Task<ActionResult<List<Activity>>> GetActivities()
        { 
            return await Mediator.Send(new ActivityList.Query());
        }


        [HttpGet("{id}")]
        [ActionName("Activities")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]        
        public async Task<ActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command{Activity =  activity}));
        }

        [HttpPut("{id}")]    
         [ActionName("EditActivity")]    
        public async Task<ActionResult> EditActivity(Guid  id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Activity =  activity}));
        }

        [HttpDelete("{id}")]    
         [ActionName("DeleteActivity")]    
        public async Task<ActionResult> DeleteActivity(Guid  id)
        {
            
            return Ok(await Mediator.Send(new Delete.Command{Id =  id}));
        }
    }
}