require 'csv'

# row will be an array with the fields in the order they appear in the file
CSV.open('data.csv', 'r') do |row|
  Question.create!(:topic => row[0], :part1 => row[1], :word => row[2], :part2 => row[3])
end