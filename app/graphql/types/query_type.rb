module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :users, [Types::UserType], null: false, description: 'Return all users'
    def users
      User.all
    end

    field :user, Types::UserType, null: false, description: 'Finds an user by a given ID and returns' do
      argument :id, ID, required: true
    end

    def user(id:)
      User.find(id)
    end
  end
end
