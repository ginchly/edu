class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :word
      t.string :part1
      t.string :part2
      t.string :topic

      t.timestamps
    end
  end
end
