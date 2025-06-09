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
          <div className="w-full flex justify-center gap-7">
            <Button type="button" onClick={() => signIn("google", { prompt: "select_account" })} icon="google" className="bg-[#E83B2F] flex items-center justify-center w-[40px] h-[40px] rounded-3xl cursor-pointer"/>
            <Button type="button" onClick={() => signIn("kakao")} icon="kakao" className="bg-[#FFE513] flex justify-center flex items-center justify-center w-[40px] h-[40px] rounded-3xl cursor-pointer" />
            <Button type="button" onClick={() => signIn("naver")} icon="naver" className="bg-[#00BB00] flex items-center justify-center w-[40px] h-[40px] rounded-3xl cursor-pointer"/>
          </div>
      )}
    </div>
  );
}