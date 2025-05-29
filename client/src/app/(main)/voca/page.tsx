import Card from "@/components/voca/Card";

export default function Voca() {
  
  return (
    <div>
      <h1>사전페이지</h1>
      <p>여기 사전내용이 들어갑니다.</p>
      {/* 여기에 단어장 컴포넌트나 기능을 추가할 수 있습니다. */}
      <Card vocaObj={{voca:'a',name:'b',description:'c',formula:'d'}}/>
    </div>
  );
}