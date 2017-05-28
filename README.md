# README

GigSpot is a networking app for musicians to link up and get gigs. Users create a profile and highlight the instruments and genres they play, as well as gigs they're scheduled for, to increase publicity and build a work history within the app. Front-end features were built in React for a smooth user experience. When they update an instrument or add a gig, they are not taken to a form or edit page as everything happens seamlessly from within the profile page. There is also a feature to map local events through Google Maps' geolocation API. I incorporated a gig request board where requests can be made for specific instruments and genre types. When the post is made there is an audition feature embedded in the app that allows musicians to record a video audition sent directly to the poster of the request using the Pipe API, which eliminates the need to include a hyperlink to an outside source like YouTube. This app was built to create an inclusive social network for musicians to listen to each other and make music together.

### Running locally
To run the application, please just clone the repo and run it like so:
```
git clone https://github.com/donnyray27/gig_spot.git
cd gig_spot
bundle install
npm install
then run in the console
$npm start
$rails s

```
## Built With

* Ruby version 2.3.3
* [Devise](https://github.com/plataformatec/devise) - Used to authenticate users
* [CarrierWave](https://github.com/carrierwaveuploader/carrierwave) - Used to
for its ability to upload a profile photo
* [React.js](https://facebook.github.io/react/) - Used to build a beautiful user
interface
* [Foundation-Rails](https://github.com/zurb/foundation-rails) - Used to add
Foundation to our Rails project
* [Ruby-On-Rails](https://github.com/rails/rails) - Version 5.0.0 for the back-end
* [React-on-Rails](https://github.com/shakacode/react_on_rails) - This gem
allowed for placement of React components directly on Rails' ERB templates. 
