# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170507223333) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "auditions", force: :cascade do |t|
    t.integer  "gig_request_id"
    t.integer  "user_id"
    t.string   "name",           null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "video_id"
    t.index ["gig_request_id"], name: "index_auditions_on_gig_request_id", using: :btree
    t.index ["user_id"], name: "index_auditions_on_user_id", using: :btree
  end

  create_table "band_request_genres", force: :cascade do |t|
    t.integer  "band_request_id"
    t.integer  "genre_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["band_request_id", "genre_id"], name: "unique_band_req_genre", unique: true, using: :btree
    t.index ["band_request_id"], name: "index_band_request_genres_on_band_request_id", using: :btree
    t.index ["genre_id"], name: "index_band_request_genres_on_genre_id", using: :btree
  end

  create_table "band_request_instruments", force: :cascade do |t|
    t.integer  "band_request_id"
    t.integer  "instrument_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["band_request_id", "instrument_id"], name: "unique_band_req_inst", unique: true, using: :btree
    t.index ["band_request_id"], name: "index_band_request_instruments_on_band_request_id", using: :btree
    t.index ["instrument_id"], name: "index_band_request_instruments_on_instrument_id", using: :btree
  end

  create_table "band_requests", force: :cascade do |t|
    t.string   "title",       null: false
    t.string   "name",        null: false
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "description", null: false
    t.index ["user_id"], name: "index_band_requests_on_user_id", using: :btree
  end

  create_table "genres", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gig_genres", force: :cascade do |t|
    t.integer  "gig_id"
    t.integer  "genre_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["genre_id"], name: "index_gig_genres_on_genre_id", using: :btree
    t.index ["gig_id", "genre_id"], name: "unique_gig_genre", unique: true, using: :btree
    t.index ["gig_id"], name: "index_gig_genres_on_gig_id", using: :btree
  end

  create_table "gig_request_genres", force: :cascade do |t|
    t.integer  "gig_request_id"
    t.integer  "genre_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["genre_id"], name: "index_gig_request_genres_on_genre_id", using: :btree
    t.index ["gig_request_id", "genre_id"], name: "index_gig_request_genres_on_gig_request_id_and_genre_id", unique: true, using: :btree
    t.index ["gig_request_id"], name: "index_gig_request_genres_on_gig_request_id", using: :btree
  end

  create_table "gig_request_instruments", force: :cascade do |t|
    t.integer  "gig_request_id"
    t.integer  "instrument_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["gig_request_id", "instrument_id"], name: "unique_gig_req_inst", unique: true, using: :btree
    t.index ["gig_request_id"], name: "index_gig_request_instruments_on_gig_request_id", using: :btree
    t.index ["instrument_id"], name: "index_gig_request_instruments_on_instrument_id", using: :btree
  end

  create_table "gig_requests", force: :cascade do |t|
    t.string   "title",       null: false
    t.date     "event_date",  null: false
    t.string   "description", null: false
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["user_id"], name: "index_gig_requests_on_user_id", using: :btree
  end

  create_table "gigs", force: :cascade do |t|
    t.string   "venue",       null: false
    t.string   "address",     null: false
    t.string   "description"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.datetime "event_date",  null: false
    t.index ["user_id"], name: "index_gigs_on_user_id", using: :btree
  end

  create_table "instruments", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_genres", force: :cascade do |t|
    t.integer "user_id"
    t.integer "genre_id"
    t.index ["genre_id"], name: "index_user_genres_on_genre_id", using: :btree
    t.index ["user_id", "genre_id"], name: "unique_user_genres", unique: true, using: :btree
    t.index ["user_id"], name: "index_user_genres_on_user_id", using: :btree
  end

  create_table "user_instruments", force: :cascade do |t|
    t.integer "user_id"
    t.integer "instrument_id"
    t.index ["instrument_id"], name: "index_user_instruments_on_instrument_id", using: :btree
    t.index ["user_id", "instrument_id"], name: "unique_user_instruments", unique: true, using: :btree
    t.index ["user_id"], name: "index_user_instruments_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name",                                null: false
    t.string   "last_name",                                 null: false
    t.integer  "zip_code",                                  null: false
    t.string   "bio",                                       null: false
    t.string   "email",                  default: "",       null: false
    t.string   "encrypted_password",     default: "",       null: false
    t.string   "role",                   default: "member", null: false
    t.string   "avatar"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,        null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
