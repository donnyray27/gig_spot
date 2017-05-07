import ReactOnRails from 'react-on-rails';

import HelloWorld from '../bundles/HelloWorld/components/HelloWorld';
import DateTime from '../bundles/HelloWorld/components/DateTime';
import UserData from '../containers/UserData';
import GigRequestIndex from '../containers/GigRequestIndex'
import BandRequestIndex from '../containers/BandRequestIndex'
import GigRequestShow from '../components/GigRequestShow'
import Pipe from '../components/Pipe'
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  DateTime,
  UserData,
  GigRequestIndex,
  BandRequestIndex,
  GigRequestShow,
  Pipe
});
