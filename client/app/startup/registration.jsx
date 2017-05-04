import ReactOnRails from 'react-on-rails';

import HelloWorld from '../bundles/HelloWorld/components/HelloWorld';
import DateTime from '../bundles/HelloWorld/components/DateTime';
import UserData from '../containers/UserData';
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  DateTime,
  UserData,
});
