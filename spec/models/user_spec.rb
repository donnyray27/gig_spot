require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_valid(:first_name).when('testname', 'myname') }
  it { should_not have_valid(:first_name).when(nil, 123) }
end
