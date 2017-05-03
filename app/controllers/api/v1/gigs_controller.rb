class Api::V1::GigsController < ApplicationController

  skip_before_filter  :verify_authenticity_token

  def index
    @user = User.all
  end

  # {"id"=>"1", "venue"=>"Crown Royal Hotel", "address"=>"1 Main St. Woburn, MA", "dateTime"=>"2017-05-30T19:00:00.000Z", "description"=>"playaing a gala for my church", "user_id"=>"1", "gig"=>{"id"=>"1", "venue"=>"Crown Royal Hotel", "address"=>"1 Main St. Woburn, MA", "description"=>"playaing a gala for my church"}}

  def update
    binding.pry
    # gig = Gig.find(params[:gig][:id])
    # gig.update()
    # @gig = Review.find(params[:review_id])
    #     if user_signed_in?
    #       if params[:upvote]
    #         check_user_upvote(@review).save
    #       elsif params[:downvote]
    #         check_user_downvote(@review).save
    #       end
    #     end
    #
    #     @release = @review.release
    #     @reviews = @release.reviews.order(id: :desc)
    #     render json: @reviews
  end

  def gig_params
    params.fetch(:gig).permit(
    :venue,
    :address,
    :dateTime,
    :description)
  end
end
