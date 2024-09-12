type TitleProps = {children: any, classNames?: string};

export function MainTitle() {
  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-row flex-wrap justify-center text-4xl bg-slate-200 hover:bg-gradient-to-br hover:from-blue-300 hover:to-red-600 rounded-lg border-black border-2 px-8 py-4 gap-2 shadow-xl">
        20 
        <div className="flex flex-row">
        <div className="hover:animate-bounce cursor-pointer hover:text-slate-200"><a target="_blank" href="https://github.com/NateDiamond/pressing-qs" className="font-bold">PRESS</a></div>
        ing
        </div>
        Questions
      </div>
    </div>
  );
}

export function Title({children, classNames}: TitleProps) {
  return (
    <div className={`${classNames} text-xl text-center font-mono font-bold`}>
      {children}
    </div>
  )
}

