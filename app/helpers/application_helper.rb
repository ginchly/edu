module ApplicationHelper

  # Returns the full title on a per-page basis.
  def full_title(page_title)
    base_title = "WordWar"
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
  		
  	rand_id = rand(topicQuestions.count)
  	question = topicQuestions[rand_id]
  	question
  end

  def get_all_words()
  	topic = [params[:topic]]
  	words = Question.select(:word).where("topic = ?", topic)

  end

end