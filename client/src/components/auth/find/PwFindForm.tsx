import { useState } from "react";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { EmailVerification } from "../signup/fields/EmailVerification";
import { ResetPasswordModal } from "./ResetPassword";

import axios from "axios";

export function PwFindForm() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !id) {
      setModalMessage("아이디와 이메일을 모두 입력해주세요.");
      return;
    }
  
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/find-password`, {
        id,
        email,
      });
  
      if (res.status === 200) {
        setModalMessage("비밀번호 변경");
      }
    } catch (error: any) {
      setModalMessage(error.response?.data?.message || "요청에 실패했습니다.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <p className="text-sm">아이디</p>
          <Input
            // label="아이디"
            name="id"
            placeholder="아이디"
            onChange={(e) => setId(e.target.value)}
            className="w-full p-3 bg-[#B0DB9C]/40 rounded"
            divClassname="flex-1"
          />
        </div>

        <div>
          <p className="text-sm">이메일</p>
          <Input
            // label="이메일"
            name="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-[#B0DB9C]/40 rounded"
            divClassname="flex-1"
          />

        </div>
        <div>
          <p className="text-sm">인증번호</p>
          <EmailVerification
            email={email}
            onValidChange={setShowPasswordResetModal}

          />
        </div>
        <Button
          name="확인"
          type="submit" className="bg-[#B0DB9C] rounded p-3 cursor-pointer"/>
      </form>
      {modalMessage && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/5 bg-white p-5 rounded-lg shadow-xl z-[1000] text-center">
          <p>{modalMessage}</p>

        </div>
      )}
      {showPasswordResetModal && (
        <ResetPasswordModal
          userId={id}
          onClose={() => setShowPasswordResetModal(false)}
          onSuccess={() => {
            alert('변경완료');
          }}
        />
      )}
      
    </div>
  );
}