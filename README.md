Trying to use Loader to solve N+1 queries

We have Users and Books.
One user can have many books.

## When we query for all the users (app/graphql/types/query_type.rb):

  ### 1 - We return User.all
  
  ### 2 - The UserType has a 'books' field (app/graphql/types/user_type.rb)
  
  ### 3 - This is going to cause N+1 queries as we are running one query to find for the user and then N queries to fetch all the N books that belongs to this user
  
  ### 4 - I didn't manage to use the loader properly to prevent this problem
  
  ### 5 - The loader is in (app/graphql/loaders/loader.rb)
  
  ------------------------------------------------------------------------------
  
  ### 6 - I managed to make it work but I don't know if it's the right way
