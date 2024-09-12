type GameButtonProps = {classNames?: string, children: any, onPress: Function};

export function GameButton({classNames, children, onPress}: GameButtonProps) {
  return (
    <button onClick={(event) => onPress(event)} className={`${classNames} hover:scale-110 hover:-translate-y-1 bg-slate-200 border-2 border-black rounded-lg text-4xl py-2 px-4 font-bold`}>
      {children}
    </button>
  );
}