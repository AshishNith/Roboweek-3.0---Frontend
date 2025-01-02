import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { signInWithGoogle, handleGoogleCallback } from '../services/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleGoogleCallback(code)
        .then((response) => {
          login(response.user);
          navigate('/events');
        })
        .catch((error) => {
          console.error('Google callback error:', error);
          setError('Failed to complete Google sign-in');
        });
    }
  }, [searchParams, login, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
      };

      login(userData);
      navigate('/events');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Failed to initiate Google sign-in');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center relative z-1000'>
      <div className="z-100 p-10 border border-cyan-500/30 rounded-xl bg-black/20 backdrop-blur-lg w-full max-w-md">
        <h1 className='text-center text-cyan-500 font-bold mb-10 text-4xl'>Login</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-5 z-100'>
          <div>
            <h1 className='text-white text-lg mb-2'>Name</h1>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className='w-full text-gray-300 p-3 relative z-100 bg-black/20 backdrop-blur-xl rounded-sm border border-cyan-500/30'
              placeholder="Enter your name"
            />
          </div>

          <div>
            <h1 className='text-white text-lg mb-2'>Email</h1>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className='w-full text-gray-300 p-3 relative z-100 bg-black/20 backdrop-blur-xl rounded-sm border border-cyan-500/30'
              placeholder="Enter your email"
            />
          </div>

          <div>
            <h1 className='text-white text-lg mb-2'>Password</h1>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className='w-full text-gray-300 p-3 relative z-100 bg-black/20 backdrop-blur-xl rounded-sm border border-cyan-500/30'
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-center w-full mt-4">
            <Button
              type="submit"
              text='Login'
              textSize='text-2xl'
              iconLink={<i className="ri-login-box-line text-3xl"></i>}
            />
          </div>
        </form>

        <div className="flex items-center gap-4 w-full my-6">
          <div className="flex-1 h-px bg-cyan-500/30"></div>
          <span className="text-gray-400">or</span>
          <div className="flex-1 h-px bg-cyan-500/30"></div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleGoogleSignIn}
            text="Sign in with Google"
            textSize="text-lg"
            iconLink={<i className="ri-google-fill text-2xl"></i>}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;