import introJS from 'intro.js'

  export  const handleChartGuide = ()=>{
        introJS().setOptions({
            steps:[
                    {
                        element:'#stock-info',
                        intro: '주식 이름, 심볼, 가격을 확인할 수 있습니다'
                    },
                    {
                        element:'#favorite',
                        intro:'관심 종목으로 추가할 수 있습니다'
                    },{
                        element:'#stock-chart',
                        intro:'마우스를 올리면 해당 시기의 정보를 볼 수 있습니다'
                    },{
                        element:'#stock-button',
                        intro:'판매, 구매와 관련된 가이드를 보고 싶으면 버튼을 눌러주세요'
                    }
                ],
                showProgress: true,
                exitOnOverlayClick: false,
                nextLabel: '다음',
                prevLabel: '이전',
                doneLabel: '완료',
        }).oncomplete(()=>{
            sessionStorage.setItem('start-trade-guide','true')
            sessionStorage.removeItem('start-chart-guide')
        }).onexit(()=>{
            sessionStorage.setItem('start-trade-guide','true')
            sessionStorage.removeItem('start-chart-guide')
        }).start()
    }

  export  const handleTradeGuide=()=>{
        introJS().setOptions({
            steps:[
              {
                element:'#stock',
                intro:'해당 주식의 정보 입니다'
              },{
                element:'#value',
                intro: '원하는 수량을 입력하면 총 가격이 계산됩니다'
              },{
                element:'#button',
                intro:'버튼을 누르면 거래가 진행됩니다'
              }
            ],
            showProgress: true,
            exitOnOverlayClick: false,
            nextLabel: '다음',
            prevLabel: '이전',
            doneLabel: '완료',
        }).oncomplete(()=>{
            sessionStorage.removeItem('start-trade-guide')
        }).onexit(()=>{
            sessionStorage.removeItem('start-trade-guide')
        }).start()
    }