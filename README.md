## Using graphql-batch gem to solve N+1 queries

This is an application created using Rails with a graphql API and a frontend in React consuming from the API.
This example was created to practice working with this stack and to practice solving N+1 queries.

We have Users and Books.
One user can have many books.

## When we query for all the users (app/graphql/types/query_type.rb):
  
  ### 1 - The UserType has a 'books' field (app/graphql/types/user_type.rb)
  
  ### 2 - This is going to cause N+1 queries as we are running one query to find for the user and then N queries to fetch all the N books that belongs to this user
  
  ### 3 - The loader is in (app/graphql/loaders/loader.rb)
  
  ------------------------------------------------------------------------------
  
  ### PS - We could also use includes() as it's commented in the code
