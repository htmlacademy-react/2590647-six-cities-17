import './loading.css';

export default function Loading(): JSX.Element {
  return (
    <div className='loader-wrapper'>
      <span className="loader" data-testid="loader"></span>
    </div>
  );
}
