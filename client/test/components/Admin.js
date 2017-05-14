import Admin from 'components/Admin'

describe('Admin', () => {
  let users

  beforeEach(() => {
    wrapper = mount(
      <Admin
        users={[{
          avatar: {url: null},
          bio: null,
          first_name: "jane",
          last_name: "doe",
          role: "member",
          id: 1
        }]}
        />
    )
  })
})


it('should render an anchor tag with the user first and last name', () => {
  expect(wrapper.find(a).text().toBe('jane doe'))
})

it('should render a button to delete the user', () => {
  expect(wrapper.find(button).text().toBe('Delete User'))
})
