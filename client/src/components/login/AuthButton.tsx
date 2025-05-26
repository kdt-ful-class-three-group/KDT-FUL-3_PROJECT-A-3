"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../common/Button";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>로딩 중...</p>;

  const logout = async () => {
    await signOut({ redirect: false }); // 우리 앱 세션 종료
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = "http://localhost:3000/login"; // 콘솔에 등록된 리디렉션 URI
    window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${clientId}&logout_redirect_uri=${redirectUri}`;
  }


  return (
    <div>
      {session ? (
        <>
          <button onClick={logout}>로그아웃</button>
        </>
      ) : (
          <div>
            <Button type="button" onClick={() => signIn("google", { prompt: "select_account" })} name="구글 로그인" />
            <Button type="button" onClick={() => signIn("kakao", { prompt: "login" })} name="카카오 로그인" />
            <Button type="button" onClick={() => signIn("naver", { prompt: "select_account" })} name="네이버 로그인" />
          </div>
      )}
    </div>
  );
}