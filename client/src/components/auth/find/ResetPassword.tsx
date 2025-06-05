// components/auth/find/ResetPassword.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import axios from "axios";

interface ResetPasswordProps {
  userId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ResetPasswordModal({ userId, onClose, onSuccess }: ResetPasswordProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter()

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8008/auth/reset-password", {
        user_id: userId,
        password: newPassword,
      });

      if (res.status >= 200 && res.status < 300) {
        setMessage("비밀번호가 변경되었습니다.");
        onSuccess?.();
        router.push('/login');
      }
    } catch (err) {
      setMessage("비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      width: '300px'
    }}>
      <h3>비밀번호 재설정</h3>
      <Input
        label="새 비밀번호"
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="새 비밀번호"
      />
      <Input
        label="비밀번호 확인"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
      />
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <Button name="변경 완료" onClick={handlePasswordReset} />
      <button onClick={onClose}>
        닫기
      </button>
    </div>
  );
}