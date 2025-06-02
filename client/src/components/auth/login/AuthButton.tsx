"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/common/Button";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>로딩 중...</p>;

  const logout = async () => {
    await signOut({ redirect: false }); // 우리 앱 세션 종료

    const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const naverClientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const redirectUri = "http://localhost:3000/login"; // 콘솔에 등록된 리디렉션 URI

    const provider = session?.user?.provider;

    if (provider === "kakao") {
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${kakaoClientId}&logout_redirect_uri=${redirectUri}`;
    } else if (provider === "naver") {
      window.location.href = `https://nid.naver.com/nidlogin.logout?client_id=${naverClientId}&logout_redirect_uri=${redirectUri}`;
    }
  }

  return (
    <div>
      {session ? (
        <>
            <Button type="button" onClick={logout} name="로그아웃" />
        </>
      ) : (
          <div>
            <Button type="button" onClick={() => signIn("google", { prompt: "select_account" })} name="구글 로그인" />
            <Button type="button" onClick={() => signIn("kakao")} name="카카오 로그인" />
            <Button type="button" onClick={() => signIn("naver")} name="네이버 로그인" />
          </div>
      )}
    </div>
  );
}