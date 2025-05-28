// 모달창
import Trade from "./Trade"
import Create from "./Create"

export function Modal({type}:{type:'trade'|'create'}){
  return(
    <div>
      {type === 'trade' ? <Trade /> : <Create/>}
    </div>
  )
}