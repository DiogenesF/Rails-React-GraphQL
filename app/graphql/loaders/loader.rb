module Loaders
class Loader < GraphQL::Batch::Loader
    def initialize(users)
      @users = users
    end
  
    def perform(ids)
      @users.where(id: ids).each { |record| fulfill(record.id, record) }
      ids.each { |id| fulfill(id, nil) unless fulfilled?(id) }
    end
  end
end