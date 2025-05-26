import { IdField } from "./IdField";

export default {
  title:'Form/IdField',
  component: IdField,
}

export const Default = ()=>{
  <IdField value='' onChange={(e)=>console.log(e.target.value)}/>
}