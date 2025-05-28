// 모달창
import Trade from "./Trade"
import Create from "./Create"

type props = {
  type:'trade'|'create';
  onConfirm?: ()=>void
}

export function Modal({type, onConfirm}:props){
  return(
    <div>
      {type === 'trade' ? <Trade /> : <Create onConfirm={onConfirm}/>}
    </div>
  )
}