import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import FramePage from './components/FrameView';
import icon from '../../assets/icon.svg';
import './App.css';

function Hello() {
  const navigate = useNavigate();

  const goFramePage = () => {
    console.log('goFramePage');
    // 通过路由跳转至 /frame
    navigate('/frame');
  };

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
        {/* <video src="https://www.runoob.com/try/demo_source/movie.mp4" controls>
          您的浏览器不支持 video 标签。
          <track kind="captions" src="subtitles_en.vtt" label="English" />
        </video> */}
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
        <button type="button">
          <span role="img" aria-label="folded hands">
            🖼️
          </span>
          Open New Window
        </button>
        <button type="button" onClick={goFramePage}>
          Open Frame
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/frame" element={<FramePage />} />
      </Routes>
    </Router>
  );
}
