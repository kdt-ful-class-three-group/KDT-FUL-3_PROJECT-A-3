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
  const [domain, setDomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [isCustom, setIsCustom] = useState(false);

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
      onChange(`${local}@${actualDomain}`);
    }
  }, [local, domain, customDomain, onChange]);

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