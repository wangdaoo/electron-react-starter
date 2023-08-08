import { useNavigate } from 'react-router-dom';

export default function useBack() {
  const navigate = useNavigate();

  const back = () => {
    // 返回上一级路由
    navigate(-1);
  };

  return back;
}
