import ProgressBar from '../ProgressBar';

export default function ProgressBarExample() {
  return (
    <div className="p-8 space-y-4">
      <ProgressBar progress={33} />
      <ProgressBar progress={66} />
      <ProgressBar progress={100} />
    </div>
  );
}