// 레벨 계산
export function calcLevel(tradeCount:number, tradeVolume:number){
  // 1 - count 0-2 volumet -만
  if(tradeCount<=2 || tradeVolume<=10000){
    return {level:1, name:'입문자',exp:'첫 주식 도전'}
  }
  // 2 - count 3-5 volumet -만-3만
  if(tradeCount<=5 || tradeVolume<=30000){
    return {level:2, name:'초보 투자자', exp:'주식 경험 중'}
  }
  // 3 - count 6-10 volumet -3만-6만
  if(tradeCount<=10|| tradeVolume<=60000){
    return {level:3, name:'성장 투자자', exp:'다양한 종목에 투자 중'}
  }
  // 4 - count 11-20 volumet -6만-10만
  if(tradeCount<=20||tradeVolume<=100000){
    return{level:4, name:'숙련 투자자', exp:'자금을 굴려봄'}
  }
  // 5 - count 21회 이상 volumet -10만
  return {level:5, name:'고수', exp:'투자 고수'}
}