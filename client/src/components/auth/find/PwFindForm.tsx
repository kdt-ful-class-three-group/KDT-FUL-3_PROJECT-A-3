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
      const res = await axios.post("http://localhost:8008/auth/find-password", {
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
      <form onSubmit={handleSubmit}>
        <Input
          label="아이디"
          name="id"
          placeholder="아이디"
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          label="이메일"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <EmailVerification
          email={email}
          onValidChange={setShowPasswordResetModal}
        />
        <Button
          name="확인"
          type="submit" />
      </form>
      {modalMessage && (
        <div style={{
          position: 'fixed',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 1000,
          textAlign: 'center'
        }}>
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