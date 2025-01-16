import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import styles from '../../styles/AuthForm.module.css';

export default function AuthForm() {
  const router = useRouter(); // Initialize router
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [transitionState, setTransitionState] = useState('');

  useEffect(() => {
    if (isRegister) {
      setTransitionState('enter');
      const timeout = setTimeout(() => setTransitionState(''), 500);
      return () => clearTimeout(timeout);
    } else {
      setTransitionState('exit');
      const timeout = setTimeout(() => setTransitionState(''), 500);
      return () => clearTimeout(timeout);
    }
  }, [isRegister]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = isRegister ? { name, email, password } : { email, password };

    const response = await fetch(isRegister ? '/api/auth/register' : '/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error:', errorText);
      return;
    }

    const data = await response.json();
    console.log(data);

    // Navigate to appropriate page based on action
    if (isRegister) {
      router.push('/login'); // Redirect to login after registration
    } else {
      router.push('/homepage'); // Redirect to homepage after login
    }
  };

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
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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