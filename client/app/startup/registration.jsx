import ReactOnRails from 'react-on-rails';


import UserData from '../containers/UserData';
import GigRequestIndex from '../containers/GigRequestIndex'
import GigRequestShow from '../components/GigRequestShow'
import AuditionShow from '../components/AuditionShow'
import SpotifyContainer from '../containers/SpotifyContainer'
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  UserData,
  GigRequestIndex,
  GigRequestShow,
  AuditionShow,
  SpotifyContainer
});
