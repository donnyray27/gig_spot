class GigRequestsController < ApplicationController


  def index
    @gig_requests = []
    all_gig_requests = GigRequest.all.order(created_at: :desc)
    all_gig_requests.each do |gig_request|
      gig_genres = gig_request.genres.pluck(:name)
      gig_instruments = gig_request.instruments.pluck(:name)
      gig_poster = gig_request.user
      @gig_requests << {
                          details: gig_request,
                          genres: gig_genres,
                          instruments: gig_instruments,
                          user: gig_poster
                        }
    end
    @all_genres = Genre.all.order(name: :asc).pluck(:name)
    @all_instruments = Instrument.all.order(name: :asc).pluck(:name)
  end

  def show
    @gig_request = {}
    gig_requested = GigRequest.find(params[:id])
    gig_genres = gig_requested.genres.pluck(:name)
    gig_instruments = gig_requested.instruments.pluck(:name)
    audition_data = gig_requested.auditions.pluck(:id, :name)
    gig_auditions = audition_data.map do |audition|
      this_audition = Audition.find(audition[0])
      audition_user = this_audition.user
      audition << audition_user
    end
    gig_poster = gig_requested.user
    @gig_request = {
      details: gig_requested,
      genres: gig_genres,
      instruments: gig_instruments,
      auditions: gig_auditions,
      user: gig_poster
    }
    @all_genres = Genre.all.pluck(:name)
    @all_instruments = Instrument.all.pluck(:name)
  end

  def update
    results = []
    results_genres = []
    results_instruments = []
    if !params[:genres].empty? && !params[:instruments].empty?
      params[:genres].each do |genre|
      genre = Genre.find_by(name: genre)
      gig_requests = genre.gig_requests
      results_genres += gig_requests
      end
      params[:instruments].each do |instrument|
      instrument = Instrument.find_by(name: instrument)
      gig_requests = instrument.gig_requests
      results_instruments += gig_requests
      end

      results = results_genres & results_instruments
      unless results.empty?
        @gig_requests = []
        @gig_requests = format_gigs(results)
        render json: @gig_requests
      else
        render json: []
      end

    elsif !params[:genres].empty?
        params[:genres].each do |genre|
        genre = Genre.find_by(name: genre)
        gig_requests = genre.gig_requests
        results += gig_requests
        end
        unless results.empty?
          @gig_requests = []
          @gig_requests = format_gigs(results)
          render json: @gig_requests
        else
          render json: []
        end

    elsif !params[:instruments].empty?
      params[:instruments].each do |instrument|
      instrument = Instrument.find_by(name: instrument)
      gig_requests = instrument.gig_requests
      results += gig_requests
      end
      unless results.empty?
        @gig_requests = []
        @gig_requests = format_gigs(results)
        render json: @gig_requests
      else
        render json: []
      end

    else
      all_gig_requests = GigRequest.all.order(created_at: :desc)
      @gig_requests = format_gigs(all_gig_requests)
      render json: @gig_requests
    end

  end

  def destroy
    gig_request = GigRequest.find(params[:id])
    gig_request_instruments = GigRequestInstrument.where(gig_request_id: gig_request.id)
    gig_request_genres = GigRequestGenre.where(gig_request_id: gig_request.id)
    gig_request_auditions = Audition.where(gig_request_id: gig_request.id)
    unless gig_request_instruments.empty?
      gig_request_instruments.each do |instrument|
        instrument.destroy
      end
    end

    unless gig_request_genres.empty?
      gig_request_genres.each do |genre|
        genre.destroy
      end
    end

    unless gig_request_auditions.empty?
      gig_request_auditions.each do |audition|
        audition.destroy
      end
    end

    gig_request.destroy

    @gig_requests = []
    all_gig_requests = GigRequest.all
    all_gig_requests.each do |gig_request|
      gig_genres = gig_request.genres.pluck(:name)
      gig_instruments = gig_request.instruments.pluck(:name)
      gig_auditions = gig_requested.auditions.pluck(:name)
      gig_poster = gig_request.user
      @gig_requests << {
                          details: gig_request,
                          genres: gig_genres,
                          instruments: gig_instruments,
                          auditions: gig_auditions,
                          user: gig_poster
                        }
    end
  end

  private
  def gig_request_params
    params.permit(
    :id,
    :location,
    :genres,
    :instruements,
    :distance
    )
  end

  def format_gigs(array)
    return_value = []
      array.each do |gig_request|
      gig_genres = gig_request.genres.pluck(:name)
      gig_instruments = gig_request.instruments.pluck(:name)
      gig_poster = gig_request.user
      return_value << {
                          details: gig_request,
                          genres: gig_genres,
                          instruments: gig_instruments,
                          user: gig_poster
                        }
    end
    return return_value
  end
end
