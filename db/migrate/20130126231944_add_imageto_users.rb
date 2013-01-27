class AddImagetoUsers < ActiveRecord::Migration
  def up
  	add_column :users, :image, :string
  end

  def down
  end
end
