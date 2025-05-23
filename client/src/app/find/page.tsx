"use client";

import { useState } from "react";
import Link from "next/link";
import { IdFindForm } from "@/components/find/IdFindForm";
import { PwFindForm } from "@/components/find/PwFindForm";
import { Button } from "@/components/common/Button";

export default function Find() {
  const [activeTab, setActiveTab] = useState<"id" | "pw">("id")

  return (
    <div>
      <div>
        <Button onClick={() => setActiveTab("id")} name="아이디 찾기"/>
        <Button onClick={() => setActiveTab("pw")} name="비밀번호 찾기"/>
      </div>

      <div>
        {activeTab === "id" && <IdFindForm />}
        {activeTab === "pw" && <PwFindForm />}
      </div>

      <div>
      <Link href='/login'>로그인 하기</Link>
      </div>

    </div>
  )
}