# complexapi
Simple Node API to help with the design of more complex patterns

## Default Routes  
The default routes available are:

| Route | Details |  
|-------|---------|  
| `/` | Simple response with local parameters. |  
| `/status` | Expanded response including environment variables and a ping (`/`) of upstream URL(s). |  
| `/test` | Same as `/status` but invokes a recursive test upstream URL(s) on _their_ `/test` route . |  

## Routes When `NODE_BASE` Is Set  
The default routes available are:

| Route | Details |  
|-------|---------|  
| `/` | Simple response with local parameters. |  
| `/%NODE_BASE%` | Simple response with local parameters. |  
| `/%NODE_BASE%/status` | Expanded response including environment variables and a ping (`/`) of upstream URL(s). |  
| `/%NODE_BASE%/test` | Same as `/status` but invokes a recursive test upstream URL(s) on _their_ `/test` route . |  
