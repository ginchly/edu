OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  #dev
  #provider :facebook, FACEBOOK_CONFIG['app_id'], FACEBOOK_CONFIG['secret']
  #heroku
  provider :facebook, "410916555661149", "ee1d4551ae60a4ef3c4a910581229811"
  
  	
end