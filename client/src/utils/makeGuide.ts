import introJs from 'intro.js';import 'intro.js/introjs.css'

export const waitElements = (selectors:string[],callback:()=>void)=>{
  const interval = setInterval(()=>{
    const allExist = selectors.every(sel => document.querySelector(sel))

    if(allExist){
      clearInterval(interval)
      callback()
    }
  },100)
  return ()=>clearInterval(interval)
}

export const runGuide=({
  steps,
  onComplete,
  onExit,
}:{
  steps: Parameters<ReturnType<typeof introJs>['setOptions']>[0]['steps'],
  onComplete?: ()=> void,
  onExit?: ()=>void
})=>{
  const intro = introJs()
  intro.setOptions({
    steps,
    showProgress: true,
    exitOnOverlayClick: false,
    nextLabel: '다음',
    prevLabel: '이전',
    doneLabel: '완료',
  })

  if(onComplete) intro.oncomplete(onComplete);
  if(onExit) intro.onexit(onExit);
  intro.start()
}