import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import icon from '@assets/icon.svg';
import FramePage from '@components/FrameView';
import { Channels } from '../main/preload';

const buttonClass = {
  base: 'items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
  marginRight: 'mr-6',
};

function Home() {
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
    <>
      <div className="flex justify-center">
        <img width="200" className="mt-10" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="flex">
        <button
          className={[buttonClass.base, buttonClass.marginRight].join(' ')}
          type="button"
          onClick={goFramePage}
        >
          Open Iframe
        </button>
        <button
          className={buttonClass.base}
          type="button"
          onClick={sendMainMessage}
        >
          往主进程发送消息
        </button>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/frame" element={<FramePage />} />
      </Routes>
    </Router>
  );
}
