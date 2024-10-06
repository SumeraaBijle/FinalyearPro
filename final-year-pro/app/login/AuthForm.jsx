import { useState, useEffect } from 'react';
import styles from '../../styles/AuthForm.module.css';

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [transitionState, setTransitionState] = useState('');

  useEffect(() => {
    // Set the transition state when changing between login and register
    if (isRegister) {
      setTransitionState('enter');
      const timeout = setTimeout(() => setTransitionState(''), 500); // Duration matches the CSS transition duration
      return () => clearTimeout(timeout);
    } else {
      setTransitionState('exit');
      const timeout = setTimeout(() => setTransitionState(''), 500); // Duration matches the CSS transition duration
      return () => clearTimeout(timeout);
    }
  }, [isRegister]);

  return (
    <div className={styles.container}>
      <div className={`${styles.box} ${transitionState}`}>
        {!isRegister ? (
          <div className={styles.login}>
            <div className={styles.welcome}>
              <h1>Welcome</h1>
              <p>Join Our Unique Platform, Explore a New Experience</p>
              <button onClick={() => setIsRegister(true)}>REGISTER</button>
            </div>
            <div className={styles.signin}>
              <h2>Sign In</h2>
              <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <div>
                  <input type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <a href="#">Forgot password?</a>
                <button type="submit">LOGIN</button>
              </form>
            </div>
          </div>
        ) : (
          <div className={styles.register}>
            <div className={styles.createAccount}>
              <h2>Create Account</h2>
              <form>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">REGISTER</button>
              </form>
            </div>
            <div className={styles.helloAgain}>
              <h1>Hello, Again</h1>
              <p>We are happy to see you back</p>
              <button onClick={() => setIsRegister(false)}>LOGIN</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
