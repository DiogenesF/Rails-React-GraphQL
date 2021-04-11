class Mutations::UpdateUser < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :email, String, required: false
  
    field :user, Types::UserType, null: true
    field :errors, [String], null: false
  
    def resolve(args)
      user = User.find_by_id(args[:id])
      return { user: nil, errors: ["No user found!"] } if !user
      user.name = args[:name] if args[:name]
      user.email = args[:email] if args[:email]
      if user.save
        {
          user: user,
          errors: [],
        }
      else
        {
          user: nil,
          errors: user.errors.full_messages
        }
      end
    end
end