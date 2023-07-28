import { useNavigate } from 'react-router-dom';

// 测试 Iframe 嵌入

export default function FramePage() {
  const navigate = useNavigate();

  const back = () => {
    // 返回
    navigate(-1);
  };

  return (
    <>
      <button type="button" onClick={back}>
        Back
      </button>
      <div style={{ width: '800px', height: '300px' }}>
        <iframe
          src="https://www.runoob.com"
          title="Frame"
          style={{ width: '100%', height: '100%' }}
        >
          您的浏览器不支持 video 标签。
          <track kind="captions" src="subtitles_en.vtt" label="English" />
        </iframe>
      </div>
    </>
  );
}
