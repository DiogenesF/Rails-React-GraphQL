class Mutations::DeleteUser < Mutations::BaseMutation
    argument :id, ID, required: true
  
    field :user_id, ID, null: true
    field :message, String, null: false
  
    def resolve(id:)
      user = User.find_by_id(id)
      return { message: "No user found!" } if !user
      if user.destroy
        {
          user_id: id,
          message: 'User deleted successfully',
        }
      else
        {
          message: "Sorry. An error occurred!"
        }
      end
    end
  end