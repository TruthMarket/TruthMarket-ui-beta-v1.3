import { useState, useEffect } from 'react';
import styles from './App.module.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home/index';
import LoadingPage from './pages/Loading/index';
import TeamPage from './pages/Team/index';
import WhitepaperPage from './pages/WhitePaper/index';
import StoryPage from './pages/Story/index';
import CasePage from './pages/Case/index';
import ValuePage from './pages/Value';
import Dapp from './Dapp';

import { ThemeProvider } from './theme/ThemeProvider';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 模拟数据加载
        const response = await new Promise<string>((resolve, reject) => {
          setTimeout(() => {
            // 模拟成功或失败
            const success = Math.random() > 0.5;
            if (success) {
              resolve('Data loaded successfully');
            } else {
              reject('Data loading failed');
            }
          }, 2000);
        });

        console.log(response);
        setLoading(false);
        setError(null); // 清除错误状态
      } catch (err) {
        console.error(err);
        setError(err as string);
        // 继续尝试加载数据
        fetchData();
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <LoadingPage />
        {error && <p>Error: {error}. Retrying...</p>}
      </>

    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className={styles.app}>
          <Routes>
            <Route path="/app/*" element={<Dapp />} />
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <div className={styles.container}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/value" element={<ValuePage />} />
                      <Route path="/story" element={<StoryPage />} />
                      <Route path="/case" element={<CasePage />} />
                      <Route path="/team" element={<TeamPage />} />
                      <Route path="/whitepaper" element={<WhitepaperPage />} />
                    </Routes>
                  </div>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App


