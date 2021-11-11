using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using static Application.Activities.Details;

namespace Application.Activities
{
    public class Edit
    {
        
     public class Command:IRequest
        {         
            public Activity Activity{get;set;}            
        }        
    

        public class Handler : IRequestHandler<Command>
        {
         
            public RectivitiesContext _context { get; }
            
            public IMapper _mapper { get; }


            public Handler(RectivitiesContext context, IMapper mapper)
            {
                    _context = context;
                    _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await  _context.Activities.FindAsync(request.Activity.Id);

                //activity.Title = request.Activity.Title ?? activity.Title;
                _mapper.Map(request.Activity, activity);
                 
                await _context.SaveChangesAsync();
                return Unit.Value;                
            }
        }
    }
}