class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates :bio, presence: true

  has_many :user_genres
  has_many :genres, through: :user_genres

  has_many :user_instruments
  has_many :instruments, through: :user_instruments

  has_many :gigs
  has_many :gig_requests
  has_many :band_requests

end
