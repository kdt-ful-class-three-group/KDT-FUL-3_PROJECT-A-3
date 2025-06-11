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

  // 버튼 조절
  const [isSend, setIsSend]= useState(false)

  const closeModal = () => setModalMessage(null);


  // 인증번호 전송
  const submitEmailCode = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}`, { email });
      if (res.status >= 200 && res.status < 300) {
        setModalMessage("인증번호가 이메일로 전송되었습니다.");
        setIsSend(true)
      }
    } catch {
      setModalMessage("인증번호 전송 실패: 이메일 주소를 확인해주세요.");
    }
  };
  // 인증번호 검증
  const submitEmailAuth = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/verifyCode`, {
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
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="인증번호"
        value={emailCode}
        onChange={(e) => setEmailCode(e.target.value)}
        name="emailAuth"
        disabled={isVerified}
        className="p-2 bg-[#B0DB9C]/30 rounded w-full"
        divClassname="flex-1"
      />
      {
        isSend ? <Button name="인증번호 확인" type="button" onClick={submitEmailAuth} className="cursor-pointer 
         bg-[#B0DB9C] rounded p-2" />
        : <Button name="인증번호 전송" type="button" onClick={submitEmailCode} className="cursor-pointer 
         bg-[#B0DB9C] rounded p-2"/>
      }
      
      
      {modalMessage && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/5 bg-white p-5 rounded-lg shadow-lg z-[1000] text-center">
          <p>{modalMessage}</p>
          <Button name="닫기" type="button" onClick={closeModal} />
        </div>
      )}
    </div>
  );
}