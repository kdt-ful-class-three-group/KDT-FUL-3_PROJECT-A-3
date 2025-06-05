import { Input } from "../common/Input"
import { Button } from "../common/Button"
import { keypadNumbers } from "./KeypadNumbers"
import { TradeContentProps } from "@/types/trade"
import { TradeKeypadProps } from "@/types/trade"
import styles from './TradeStyles.module.css'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { useEffect, useState } from "react"
import { setHavingSymbol } from "@/store/slices/havingSymbolSlice"
import { setField } from "@/store/slices/accountSlice"

export function TradeKeypad({ symbol, mode, amount, setAmount, price }: TradeContentProps & TradeKeypadProps & { price: number }) {
  const total = Number(amount) * price;

  const [modalMessage, setModalMessage] = useState<string | null>(null);

  // * 리덕스 툴킷을 활용해 가지고있는 전역으로 보내는 주식의 보유 수, 자산의 정보를 가져오기 위한 코드
  const dispatch = useDispatch()
  const havingSymbols = useSelector((state: RootState) => state.havingSymbol)
  const { account_number, asset } = useSelector((state: RootState) => state.account)

  // * 자산의 정보를 변경하기 위한 코드를 축약한 함수
  function dataChange(field: 'account_number' | 'asset', value: string) {
    dispatch(setField({ field, value }))
  }

  // * 보유 주식의 이름과 보유 주식 수를 판별하는 코드
  useEffect(() => {
    const checkSymbol = async () => {
    const res = await axios.post('http://localhost:8008/userPortfolio/calc', {}, { withCredentials:true });

    // dispatch(setHavingSymbol(res.data.map((item:any) => {item.symbol, item.much})))
    // * 데이터에 들어있는 정보들을 havingSymbol에 담는 선언
    res.data.forEach(({ symbol, much } : { symbol:string, much:number }) => {
      dispatch(setHavingSymbol({ symbol, much }));
    });
    }
    checkSymbol();
  },[])

  // ! 구매, 판매 페이지에서 새로고침 할 경우 asset데이터를 가져오지 못하는 현상이 발생해, 거래 페이지에 들어가면 asset 정보를 변경하도록 만듦.
  useEffect(() => {
    axios.post('http://localhost:8008/account/check', {}, {
      // * 쿠키를 포함해서 보낸다는 설정.
      withCredentials: true, // 쿠키 전송
    })
      // * 응답이 제대로 오면, 계좌 있음 메시지를 표출하고, setHasAccount(true)로 변경
      .then(res => {
        // * 변수 값을 불러온 데이터로 변경.
        dataChange('account_number', res.data.account_number);
        dataChange('asset', res.data.asset);
      })
      // * 응답 오류가 발생하면, 계좌 없음 메시지 표출
      .catch(err => {
        console.log('계좌 없음.', err.data);
      });
  }, [])

  // * havingSymbol과 asset값을 확인 하기 위한 코드
  useEffect(() => {
    console.log(havingSymbols);
    console.log('보유금액:',asset);
  }, [havingSymbols, asset]);
  
  // 키패드 이벤트 지우기,0무시 등
  // ! 자기 자산이랑 연동해서 자산보다 많이 입력못하게 만들어야할거같음.
  const handleKeypadClick = (value: string) => {
    if (value === '←') {
      setAmount(amount.slice(0, -1));
    } else {
      // 처음에 '0' 또는 '00'은 무시
      if (amount === '' && (value === '0' || value === '00')) {
        return;
      }
      setAmount(amount + value);
    }
  };
  
  // 모드별 구매처리 기능
  // total 금액이 0일경우 비활성화나 안눌리게해야함.
  const handleAction = () => {
    if (mode === 'sell') {
      // 판매 처리
      console.log(total);
        Promise.all([
          axios.patch(
              'http://localhost:8008/account/trade',
              { price: total, type: mode },
              { withCredentials: true }
            ),
          axios.patch(
              'http://localhost:8008/userportfolio/trade',
              { type: mode, symbol: symbol, price: total, much: amount },
              { withCredentials: true }
            )
            .then(() => {
              window.location.href = '/home';
            })
            .catch((err) => {
              console.error('거래 실패:', err);
            })
          ])

    } else {
      // 구매 처리
      console.log(total);
        Promise.all([
          axios.patch(
              'http://localhost:8008/account/trade',
              { price: total, type: mode },
              { withCredentials: true }
            ),
          axios.patch(
              'http://localhost:8008/userportfolio/trade',
              { type: mode, symbol:symbol, price:total, much: amount },
              { withCredentials: true }
            )
            .then(() => {
              window.location.href = '/home';
            })
            .catch((err) => {
              console.error('거래 실패:', err);
            }),
          ])
    } 
  };


  // * 자산 부족이나, 보유주식량 부족시 핸들액션이 일어나지 않게 만드는 함수.
  const handleClickWithCheck = () => {
    if (mode === 'buy') {
      if (total >= Number(asset)) {
        setModalMessage(null)
        return;
      } // 자산 부족
      else {
      handleAction();
      }
    } else if (mode === 'sell') {
      if (Number(amount) >= Number(havingSymbols[symbol]?.much ?? 0)) {
        setModalMessage(null)
        return;
      } // 주식 수량 부족
      else {
      handleAction();
    }
  };
}

  const modalClick = () => {
    if(Number(amount) !== 0) {
    setModalMessage(`정말로 거래 하시겠습니까?`)
    }
  }

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    if (/^\d*$/.test(value)) {
      if (amount === '' && (value === '0' || value === '00')) return;
      setAmount(value);
    }
  };

  let title;
  if (mode === 'sell') {
    title = '판매할 가격';
  } else if (mode === 'buy') {
    title = '구매할 가격';
  }

  return (
    <div>
      <div className={styles.amountBox}>
        <div className={styles.totalPrice}>
          <p>{title}</p>
          <p className={styles.totalPriceValue}>
            {amount ? `${total}풀` : '\u00A0'}
          </p>
        </div>
        <Input
          className={styles.amountInput}
          label=""
          placeholder={mode === 'sell' ? '몇 주 판매할까요?' : '몇 주 구매할까요?'}
          value={amount}
          onChange={handleAmount}
        />
      {/* 보유 풀이 부족하거나, 주식이 부족한 경우 표시하는 문구 */}
        {mode === 'buy' ? total >= Number(asset) ? <p className={styles.textRed}>보유한 풀이 부족합니다</p>: '' : ''}
        {mode === 'sell' ? Number(amount) >= Number(havingSymbols[symbol]?.much ?? 0) ? <p className={styles.textRed}>보유한 주식이 부족합니다.</p>: '' : ''}

        {modalMessage && (
        <div style={{
          position: 'fixed',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '10%',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 1000,
          textAlign: 'center'
        }}>
          <p>{modalMessage}</p>
          <h1>{`종목 명 : ${symbol}`}</h1>
          <p>{`거래 수량 : ${amount}주`}</p>
          <p>{`현재가 : ${price}`}</p>
          <p>{`총 가격: ${total}`}</p>
          <button onClick={handleClickWithCheck}> 확인 </button>
          <button onClick={() => {setModalMessage(null)}}> 취소 </button>
          {mode === 'buy' ? total >= Number(asset) ? <p className={styles.textRed}>보유한 풀이 부족합니다</p>: '' : ''}
          {mode === 'sell' ? Number(amount) >= Number(havingSymbols[symbol]?.much ?? 0) ? <p className={styles.textRed}>보유한 주식이 부족합니다.</p>: '' : ''}
        </div>)}
      </div>

      <div className={styles.keypadGrid}>
        {keypadNumbers.map((num) => (
          <Button
            className={styles.keypadButton}
            key={num}
            name={num} onClick={() => handleKeypadClick(num)} />
        ))}
      </div>

      <div className={styles.tradeButton}>
        <Button
          className={mode === 'sell' ? styles.sellButton : styles.buyButton}
          name={mode === 'sell' ? "판매하기" : "구매하기"}
          onClick={modalClick}
        />
      </div>
    </div>
  )
}