class AuditionMailer < ApplicationMailer

  def new_audition(audition)
    @audition = audition
    @gig_request = @audition.gig_request
    mail(
          to: @gig_request.user.email,
          subject: "New Audition for #{@gig_request.title}"
        )
  end
end
