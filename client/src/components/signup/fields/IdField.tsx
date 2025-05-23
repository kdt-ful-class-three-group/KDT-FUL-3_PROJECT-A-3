import { Input } from "@/components/common/Input"
import { Button } from "@/components/common/Button"
import { useEffect , useState} from "react"

export function IdField({setId}: {setId: React.Dispatch<React.SetStateAction<string>>}) {
  // id 상태 관리
  const [value, setValue] = useState('')

  //아이디 유효성 검사 - 4글자 이상 특수문자 안됨 12글자 미만
  const checkId = (text:string):boolean=>{
    const isValid = /^[a-zA-Z0-9]{4,12}$/.test(text);

    return isValid;
  }
  
  //유효성 검사 통과 -> 상태 반영
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    //유효한 글자만 남기기
    const filteredText = text.replace(/[^a-zA-Z0-9]/g, '');
    //12글자 이상일 경우 자르기
    const slicedText = filteredText.slice(0, 12);


    setValue(slicedText);

    // 유효성 검사
    if(checkId(text)){
      setId(text);
    }
  }

  // Button onClick 이벤트 추가
  const submitId=(e:React.MouseEvent)=>{
    e.preventDefault();

    if(!checkId(value)){
      alert('4글자 이상 작성')
      return
    }

    console.log("아이디 중복확인 버튼 클릭");
    //중복확인 로직


  }

  return (
    <div>
      <Input 
        name="id"
        label="아이디"
        placeholder="아이디"
        value={value}
        onChange={handleChange}
      />
      <Button
        name="중복확인"
        onClick={submitId}
      /> 
    </div>
  ) 
}