class ApplicationMailer < ActionMailer::Base
  default from: "\"GigSpot\" <no-reply@gigspot.com"
  layout 'mailer'
end
