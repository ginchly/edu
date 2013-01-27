module ApplicationHelper

  # Returns the full title on a per-page basis.
  def full_title(page_title)
    base_title = "WordWars"
    if page_title.empty?
      base_title
    else
      "#{base_title} | #{page_title}"
    end
  end

  def get_question()
  	topic = [params[:topic]]

  	#This doesn't work
  	if ([params[:topic]] == "example") 
  		question = {"part1" => "Example: Fill in the", "part2" => "in the sentences."}
  		return question
  	end

  	topicQuestions = Question.where("topic = ?", topic)

  	if (topicQuestions.count == 0)
  		topic = "Geography"
  		topicQuestions = Question.where("topic = ?", topic)
  	end

    #return array in random order to mix up the questions
  	question = topicQuestions.sort_by { rand }
  	all_questions = {"all_questions" => question[0..5]}
  end

end