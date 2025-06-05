import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useState } from "react";
import axios from "axios";

export function EmailVerification({
  email,
  onValidChange
}: {
  email: string;
  onValidChange?: (valid: boolean) => void;
}) {
  const [emailCode, setEmailCode] = useState('');
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const closeModal = () => setModalMessage(null);


  // 인증번호 전송
  const submitEmailCode = async () => {
    try {
      const res = await axios.post("http://localhost:8008/auth/sendCode", { email });
      if (res.status >= 200 && res.status < 300) {
        setModalMessage("인증번호가 이메일로 전송되었습니다.");
      }
    } catch {
      setModalMessage("인증번호 전송 실패: 이메일 주소를 확인해주세요.");
    }
  };
  // 인증번호 검증
  const submitEmailAuth = async () => {
    try {
      const res = await axios.post("http://localhost:8008/auth/verifyCode", {
        email,
        code: emailCode,
      });

      if (res.status >= 200 && res.status < 300) {
        onValidChange?.(true);
        setModalMessage("이메일 인증이 완료되었습니다!");
        setIsVerified(true);
      }
    } catch {
      onValidChange?.(false);
      setModalMessage("인증번호가 일치하지 않습니다.");
    }
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="인증번호"
        value={emailCode}
        onChange={(e) => setEmailCode(e.target.value)}
        name="emailAuth"
        disabled={isVerified}
      />
      <Button name="인증번호 전송" type="button" onClick={submitEmailCode} />
      <Button name="인증번호 확인" type="button" onClick={submitEmailAuth} />
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
          <Button name="닫기" type="button" onClick={closeModal} />
        </div>
      )}
    </div>
  );
}