import { Input } from "@/components/common/Input"
import { Select } from "@/components/common/Select";
import React, { useState, useEffect } from "react";

// 기존 inputProps 사용하려했는데 안되겠어.
interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function EmailField({ value, onChange }: EmailFieldProps) {

  const [local, setLocal] = useState("");
  const [domain, setDomain] = useState(""); // domain = 예시 도메인
  const [customDomain, setCustomDomain] = useState(""); // coustomDomain = 직접입력.
  const [isCustom, setIsCustom] = useState(false); // 예시도메인을 누르면 직접입력 input 비활성화하기위한 상태값임

  // 예시 주소 도메인들. 필요하면 여기 추가. 도메인 따로 파일로 빼서 사용할생각도 해보겠음.
  const emailDomains = [
    { name: "선택해주세요", value: "" },
    { name: "naver.com", value: "naver.com" },
    { name: "gmail.com", value: "gmail.com" },
    { name: "daum.net", value: "daum.net" },
    { name: "직접입력", value: "custom" },
  ];

  useEffect(() => {
    const actualDomain = domain === "custom" ? customDomain : domain;
    if (local && actualDomain) {
      // @포함해서 유저가 입력한 주소 보내기
      const newEmail = `${local}@${actualDomain}`;
      if (value !== newEmail) {
        onChange(newEmail);
      }
    }
  }, [local, domain, customDomain, value, onChange]);

  return (
    <div>
      <Input
        name="emailLocal"
        placeholder="이메일"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />

      <span>@</span>

      <Select
        name="emailDomain"
        value={domain}
        option={emailDomains}
        onChange={(e) => {
          const selected = e.target.value;
          setDomain(selected);
          setIsCustom(selected === "custom");
        }}
      />
      <Input
        name="customDomain"
        placeholder="직접 입력"
        value={customDomain}
        onChange={(e) => setCustomDomain(e.target.value)}
        disabled={!isCustom}
      />
    </div>
  );
}