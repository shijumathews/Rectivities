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
    public class Delete
    {
        
    public class Command:IRequest
        {         
             public Guid Id{get;set;}                 
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
                 var activity = await  _context.Activities.FindAsync(request.Id);                 
                 _context.Remove(activity);
                await _context.SaveChangesAsync();
                return Unit.Value;                
            }
        }
    }
}