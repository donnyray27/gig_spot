class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  mount_uploader :avatar, AvatarUploader

  validates :first_name,
  format: { with: /\A[a-zA-Z]+\z/, message: "is invalid or blank"}
  validates :last_name,
  format: { with: /\A[a-zA-Z]+\z/, message: "is invalid or blank"}
  validates :email, presence: true

  has_many :user_genres
  has_many :genres, through: :user_genres

  has_many :user_instruments
  has_many :instruments, through: :user_instruments

  has_many :gigs
  has_many :gig_requests
  has_many :band_requests

  has_many :auditions
  has_many :user_tracks

end
