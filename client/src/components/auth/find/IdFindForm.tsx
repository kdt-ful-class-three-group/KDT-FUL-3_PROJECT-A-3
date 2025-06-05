import { useState } from "react";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import axios from "axios";


export function IdFindForm() {
  const [email, setEmail] = useState('');
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:8008/auth/find-id", {
        email
      });
  
      setModalMessage(`가입된 아이디: ${res.data.user_id}`);
    } catch (err) {
      setModalMessage("일치하는 정보가 없습니다.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="이메일"
          name="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" name="확인"/>
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
          <Button name="닫기" type="button" onClick={() => setModalMessage(null)} />
        </div>
      )}
    </div>
  )
}