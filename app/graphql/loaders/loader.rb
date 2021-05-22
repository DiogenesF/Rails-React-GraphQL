module Loaders
class Loader < GraphQL::Batch::Loader
    def initialize(model)
      @model = model
    end
  
    def perform(ids)
      @model.where(user_id: ids).group_by(&:user_id).each { |record| fulfill(record[0], record[1]) }
    end
  end
end