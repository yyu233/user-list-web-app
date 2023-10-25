import Header from '../Header/Header';
import UserList from '../UserList/UserList';
import './App.css';
import LoadinIndicator from '../LoadingIndicator/LoadingIndicator';

function App() {
  
  return (
    <div className='wrapper'>
      <Header/>
      <UserList/>
    </div>
  );
}

export default App;
