#!/usr/bin/env rake
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

WordWar::Application.load_tasks

require 'csv'
namespace :import do
 task :csv_file => :environment do
  csv = CSV.read('app/assets/data/data.csv', col_sep: ",", headers: false)

   csv.each do |row|
   	Question.create!(topic: row[0], part1: row[1], word: row[2], part2: row[3])
   end

  end
end


