// 배지 조건 체크
type Props = {
  tradeCount : number
  tradeVolume : number
  // 수익
  // 손실
  // 로그인 횟수
  level:{level:number; name:string; exp:string;}

}

export function evaluateBadges({tradeCount, tradeVolume, level}:Props){
  return [
    {
      id:'first-trade',
      name:'첫 거래 달성',
      exp: '거래 1회 시도',
      achieved : tradeCount >=1
    },
    {
      id:'ten-trades',
      name: '10회 거래',
      exp : '누적 거래 10회 달성',
      achieved : tradeCount >=10
    },{
      id:'over-1m-invest',
      name:'100만풀 이상 투자',
      exp : '누적 투자금 100만풀 이상 달성',
      achieved : tradeVolume >=1000000,
    },{
      id:'half-pool',
      name:'절반 이상 결제',
      exp:'누적 투자금 50만풀 이상 달성',
      achieved : tradeVolume >= 500000
    },
    {
      id:'level-5',
      name:'풀의 지배자',
      exp:'최고 레벨 5 달성',
      achieved: level.level>=5
    }
  ]
}