import './App.css';
import ModalSignUpAndSignIn from './ModalSignUpAndSignIn';
import Header from './Header';
import Posts from './Posts';

function App() {
  return (
    <div className="app">
      <ModalSignUpAndSignIn/>
      <Header/>
      <Posts/>
    </div>
  );
}

export default App;
