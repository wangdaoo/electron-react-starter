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
      <blockquote className="text-2xl font-semibold italic text-center text-slate-900">
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
          <span className="relative text-white">
            electron-react-boilerplate
          </span>
        </span>
      </blockquote>
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
