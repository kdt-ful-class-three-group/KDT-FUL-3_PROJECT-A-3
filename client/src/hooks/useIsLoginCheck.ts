import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export function useIsLoginCheck({authStatus, setAuthStatus}:any){  
  const router = useRouter();
  
  useEffect(() => {
    // * 아래의 url로 포스트 요청을 보냄.
    axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/refresh`, {}, {
      // * 쿠키를 포함해서 보낸다는 설정.
      withCredentials: true, // 쿠키 전송
    })
    // * 응답이 제대로 오면, 리프레쉬 성공 메시지를 표출하고, 상탯값을 ok로 변경
    .then(res => {
      console.log('refresh 성공', res.data);
      setAuthStatus('ok');
    })
    // * 응답 오류가 발생하면, 리프레쉬 실패 메시지를 표출하고, 상탯값을 no로 변경
    .catch(err => {
      console.log('refresh 실패', err.data);
      setAuthStatus('no');
    });
  }, []);

  useEffect(() => {
    if (authStatus === 'no') {
      router.push('/login/notlogin')
    }
  })

}