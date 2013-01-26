OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['491408467568587'], ENV['6cc3c9a4ef98c9cb0b8c93c1e1c9ee8e']
end