type item = {
  name: string;
  current : number;
  comparison: number;
  change: number;
}

export default function StockCard({item}:{item:item}){
  return(
    <div style={{display:'flex', gap:'25px'}}>
      <div>
        <h4>{item.name}</h4>
      </div>
      <div>
        <p>{item.current}</p>
        <p>{item.comparison}원 ({item.change.toFixed(2)}%)</p>
      </div>
    </div>
  )
}