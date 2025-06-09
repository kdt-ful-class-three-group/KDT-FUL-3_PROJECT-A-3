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
  
      setModalMessage(`${res.data.user_id}`);
    } catch (err) {
      setModalMessage("일치하는 정보가 없습니다.");
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <p className="text-sm">이메일</p>
        <div className="flex gap-5">
          <Input
            // label="이메일"
            name="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-[#B0DB9C]/40 rounded"
            divClassname="flex-1"
          />
          <Button type="submit" name="확인" className="bg-[#B0DB9C] rounded p-3 cursor-pointer"/>

        </div>
      </form>
      {modalMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 text-center flex flex-col gap-5 px-20">
          <p className="text-sm">가입된 아이디</p>
          <p className="text-lg font-bold">{modalMessage}</p>
          <Button
            name="닫기"
            type="button"
            onClick={() => setModalMessage(null)}
            className="bg-[#B0DB9C] rounded p-1 cursor-pointer"
          />
        </div>
      )}
    </div>
  )
}