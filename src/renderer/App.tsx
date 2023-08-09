import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import icon from '@assets/icon.svg';
import FramePage from '@components/FrameView';
import { Channels } from '../main/preload';
import './App.css';

function Hello() {
  const navigate = useNavigate();

  const goFramePage = () => {
    console.log('goFramePage');
    // 通过路由跳转至 /frame
    navigate('/frame');
  };

  const channel: Channels = 'ipc-example';

  const sendMainMessage = () => {
    console.log('sendMainMessage');
    // 通过路由跳转至 /frame
    window.electron.ipcRenderer.sendMessage(
      channel,
      'Hello, 这是来自渲染进程的消息'
    );
  };

  return (
    <div>
      <div className="bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Hello World</h1>
        <p className="text-red-600">ppppp111pp</p>
        <p className="text-gray-700">
          This is a Tailwind CSS example in Electron React Boilerplate
        </p>
      </div>
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
          Open Iframe
        </button>
        <button type="button" onClick={sendMainMessage}>
          往主进程发送消息
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
