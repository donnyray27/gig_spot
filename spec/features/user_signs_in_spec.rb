require 'rails_helper'


feature "user signs in" do

  scenario "clicks sign in and fills in the fields and signs in" do
    User.create(
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    password: 'password'
    )
    visit root_path

    fill_in "Email", with: 'johndoe@gmail.com'
    fill_in "Password", with: 'password'
    click_button "Log in"

    expect(page).to have_content 'Sign Out'
    expect(page).to_not have_content 'Sign In'
  end

  scenario "clicks sign in but fills in invalid information" do
    visit root_path

    click_link "Sign In"
    fill_in "Email", with: "bademail@false.com"
    fill_in "Password", with: "badpassword"
    click_button "Log in"

    expect(page).to have_content 'Invalid Email or password'
    expect(page).to have_content 'Sign In'
    expect(page).to_not have_content 'Sign Out'
  end
end
