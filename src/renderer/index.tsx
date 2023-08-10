import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import './styles/reset.scss';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  console.log(
    `%c%s`,
    'color: #4CAF50; font-weight: bold',
    'ipc-example ↓ ONCE'
  );
  console.log('arg', arg);
});

window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
