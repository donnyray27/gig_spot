require 'rails_helper'

RSpec.describe GigRequest, type: :model do
  it { should have_valid(:title).when('testvenue', 'Need a bassist!') }
  it { should_not have_valid(:title).when('', nil) }

  it { should have_valid(:address).when('123 fun st') }
  it { should_not have_valid(:address).when(nil, '') }

  it { should have_valid(:event_date).when('May 26, 2017 8:00 pm') }
  it { should_not have_valid(:event_date).when('', nil)}

  it { should have_valid(:description).when('Please come audtion for my band') }
  it { should_not have_valid(:description).when('', nil)}
end
