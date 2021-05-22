module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :email, String, null: true
    field :name, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :books, [Types::BookType], null: true

    def books
      #object.books < this would work with the includes()
      Loaders::Loader.for(Book).load(object.id)
    end
    field :books_count, Integer, null: true

    def books_count
      object.books.size
    end

  end
end
