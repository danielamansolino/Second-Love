import { useState } from 'react';
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
  const [userPref, setUserPref] = useState('signup')
  function handlePref() {
    if( userPref === 'signup') {
      setUserPref('login')
    } else {
      setUserPref('signup')
    }
  }
  return (
    <div>
      <h1>Second Love</h1>
      { userPref === 'signup' ? <SignUpForm setUser={setUser}/> : <LoginForm setUser={setUser} />}
      <button onClick={handlePref}>
        { userPref === 'signup' ? 'Already a member? Log In' : 'Need an Account? Sign Up'}
      </button>
    </div>
  );
}


// import { useState } from 'react';
// import LoginForm from '../../components/LoginForm/LoginForm';
// import SignUpForm from '../../components/SignUpForm/SignUpForm';


// export default function AuthPage({ setUser }) {
//   const [showLogin, setShowLogin] = useState(true);

//   return (
//     <main className="AuthPage">
//       <div>
//         <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3>
//       </div>
//       {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
//     </main>
//   );
// }