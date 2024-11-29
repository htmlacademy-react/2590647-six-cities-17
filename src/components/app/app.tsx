import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  rentalQuantity: number;
}

function App({rentalQuantity}: AppProps): JSX.Element {
  return (
    <MainPage rentalQuantity={rentalQuantity} />
  );
}

export default App;
