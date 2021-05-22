module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :users, [Types::UserType], null: false, description: 'Return all users'

    def users
      User.all#.includes(:books)  < This also works in this case
    end

    field :user, Types::UserType, null: false, description: 'Finds an user by a given ID and returns' do
      argument :id, ID, required: true
    end

    def user(id:)
      User.find(id)
    end
  end
end
