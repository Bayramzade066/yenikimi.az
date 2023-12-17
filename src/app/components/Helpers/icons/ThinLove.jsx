export default function ThinLove({ className,favorite=false }) {
  return (
    <img src={`assets/images/${favorite ? 'heart_yellow' :'heart'}.png`} className={`${className} ${favorite ? 'w-10 h-10' : 'w-5 h-5'} `} alt="" />
  );
}
