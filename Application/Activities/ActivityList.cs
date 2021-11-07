using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Activities
{
    public class ActivityList
    {
        public class Query:IRequest<List<Activity>>
        {         
            
        }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            public RectivitiesContext _context { get; }

           public Handler(RectivitiesContext context)
           {
                _context = context;
           }

            
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }
    }
}
