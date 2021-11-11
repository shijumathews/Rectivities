using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using static Application.Activities.Details;

namespace Application.Activities
{
    public class Create
    {
        
    public class Command:IRequest
        {         
            public Activity Activity{get;set;}            
        }        
    

        public class Handler : IRequestHandler<Command>
        {
            public RectivitiesContext _context { get; }

            public Handler(RectivitiesContext context)
            {
                    _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();
                return Unit.Value;                
            }
        }
    }
}