import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

export default function AppRoutes() {
    const [loginInfo, setLoginInfo] = useState(null);

  useEffect(() => {
    async function fetchLoginInfo() {
      const info = await login();
      setLoginInfo(info);
    }
    fetchLoginInfo();
  }, []);
  if (!loginInfo){
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }
  else if (loginInfo && !loginInfo.success) {
        return (
            <Router>
                <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<SignIn/>} />  {/* Catch-all route */}
                </Routes>
            </Router>);
  }
  else{
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home user={loginInfo.username} />} />
                <Route path="/" element={<Home user={loginInfo.username}/>} />      
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/access-denied" element={<AccessDenied />} />
                <Route path="*" element={<NotFound />} />  {/* Catch-all route */}
            </Routes>
        </Router>
    );}

}
