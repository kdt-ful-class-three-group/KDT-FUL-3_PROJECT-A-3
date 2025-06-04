'use client'
// AccountInfo 컴포넌트 import
import AccountInfo from "@/components/simulation/AccountInfo";
// StockTab 컴포넌트 import
import StockTab from "@/components/simulation/StockTab";
// 공통 Button 컴포넌트 import
import { Button } from "@/components/common/Button";
// useState 훅 import
import { useState } from "react";

// 가이드 라이브러리 introJs import
import introJs from "intro.js";
// * introjs가 제공하는 기본 스타일 , 가이드를 사용하는 페이지 컴포넌트 상단에 한번만 import 하면 됨
// * 툴팁박스(말풍선), 오버레이, 버튼 등 다양한 UI 요소 표시
import 'intro.js/minified/introjs.min.css'

// Simulation 컴포넌트 정의 및 export
export default function Simulation() {

  // 가이드 상태 관리 (초기값: false)
  const [guide, setGuide] = useState(false)
  // ! 첫 방문인지 확인
  const [hasVisited, setHasVisited]= useState(false) // false - 첫방문

  // introjs가 안내할 단계
  // * element : 가이드할 DOM 요소 선택자, intro: 보여줄 설명, position: 튤팁위치 (top, left, right, bottom, auto-기본, auto-start, auto-end)
  const steps = [
    {
      element:'#my-account', //*id='my-account'가 설정된 HTML 요소 찾음
      intro: '여기서 내 계좌를 확인하고, 포트폴리오 페이지로 이동 가능합니다.',
      // position : "bottom
    },
    // {
    //   element:'#choose-stock-list'
    // },
    // {
    //   element:'#check-stock-card'
    // },
    // {
    //   element:'#stock-graph'
    // },
    // {
    //   element:'#buy-sell'
    // }
  ]

  // *튜토리얼 시작  함수 정의
  function startGuide(){
    const intro = introJs() // Intro.js 인스턴스 생성
    intro.setOptions({
      steps, //위에서 정의한 단계 배열 적용
      showProgress:true, //진행 상태 표시줄 보이기
      exitOnOverlayClick: false, //배경(오버레이) 클릭시 튜토리얼 종료 방지
      nextLabel:'다음', //다음 버튼 텍스트 한글 설정
      prevLabel:'이전', //이전 버튼 텍스트 한글 설정
      doneLabel:'끝내기', //완료 버튼 텍스트 한글 설정
    })
    //튜토리얼 시작
    intro.start()
    // 진행 중 
    setGuide(true)

    // 튜토리얼 완료시 이벤트 핸들러
    intro.oncomplete(()=>setGuide(false))
    // 튜토리얼 중간 종료시 이벤트 핸들러
    intro.onexit(()=>setGuide(false))
  }

  // 컴포넌트 렌더링
  return (
    <div>
      {/* 페이지 제목 */}
      <h1>시뮬레이션 페이지</h1>
      {/* 가이드 버튼*/}
      <Button name='가이드' onClick={startGuide}/>
      {/* 계좌 정보 컴포넌트 */}
      <AccountInfo />
      {/* 주식 탭 컴포넌트 */}
      <StockTab />
    </div>
  );
}
