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
    public class Details
    {
        public class Query:IRequest<Activity>
        {         
            public Guid Id{get;set;}            
        }        
    

        public class Handler : IRequestHandler<Query, Activity>
        {
            public RectivitiesContext _context { get; }

            public Handler(RectivitiesContext context)
            {
                    _context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}

