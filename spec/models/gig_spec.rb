require 'rails_helper'

RSpec.describe Gig, type: :model do
  it { should have_valid(:venue).when('testvenue', 'Boston House of Blues') }
  it { should_not have_valid(:venue).when('') }
  it { should have_valid(:address).when('address', 'test') }
  it { should_not have_valid(:address).when(nil) }
  it { should have_valid(:event_date).when('May 26, 2017 8:00 pm') }
  it { should_not have_valid(:event_date).when('', nil)}
end
