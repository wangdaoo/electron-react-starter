import BackButton from '@components/BackButton';

// 测试 Iframe 嵌入

export default function FramePage() {
  return (
    <>
      {/* <button type="button" onClick={back}>
        Back
      </button> */}
      <BackButton />
      <div style={{ width: '1000px', height: '800px' }}>
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
