import MindTrackBlue from "../../../assets/MindTracksemfund-blue.png";
import Button from '../../../components/ui/Button';
type HeaderProps = {
  onLogin: () => void;
  onSignup: () => void;
};

export function Header({ onLogin, onSignup }: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-6 sm:px-10 lg:px-20 py-4 border-b border-gray-100">
      <div className="flex items-center ">
        <img src={MindTrackBlue} alt="MindTrack logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain cursor-pointer" />
        <span className="text-xl sm:text-2xl font-semibold text-gray-800 -ml-1 cursor-pointer">MindTrack</span>
      </div>
      <div className="flex items-center space-x-3">
        <Button onClick={onLogin} variant="quaternary">Entrar</Button>
        <Button onClick={onSignup} variant="secondary">Cadastrar</Button>
      </div>
    </header>
  );
}