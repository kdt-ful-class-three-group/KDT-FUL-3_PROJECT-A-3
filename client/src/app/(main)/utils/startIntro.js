import introJs from "intro.js";
import "intro.js/introjs.css";

export function startIntro() {
  const intro = introJs();
  intro.setOptions({
    steps: [
      {
        element: '#simulation',
        intro: '여기는 시뮬레이션 페이지입니다.',
        position: 'auto'
      ,
      },
      {
        element: '#stocktab',
        intro: '여기는 주식 탭입니다. 실시간 가격과 관심종목, 보유종목들을 확인할 수 있습니다. 해당 주식을 클릭하면 상세 차트로 이동합니다.',
        position: 'auto',
      },
      {
        element: '#stock-live-info',
        intro: '실시간 정보 탭입니다. 제공되는 주식의 실시간 정보를 확인할 수 있습니다.',
        position: 'auto',
      },
      {
        element: '#bookmark',
        intro: '관심종목 탭입니다. 관심 있는 종목을 확인할 수 있습니다.',
        position: 'auto',
      },
      {
        element: '#mystock',
        intro: '보유주식 탭입니다. 보유 종목과 투자 현황을 확인할 수 있습니다.',
        position: 'left',
      },
      //스톡인포 부분
      {
        element: '#myAccount',
        intro: '내 계좌를 확인할 수 있습니다.',
        position: 'auto',
      },
      {
        element: '#myAsset',
        intro: '내 자산을 확인할 수 있습니다.',
        position: 'auto',
      },
      {
        element: '#goToPortfolio',
        intro: '해당 화살표 클릭 시 포트폴리오로 이동할 수 있습니다.',
        position: 'auto',
      },
    ],
    showBullets: false,
    showProgress: true,
    exitOnEsc: false,
    exitOnOverlayClick: false
  });
  intro.start();
}