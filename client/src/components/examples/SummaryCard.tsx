import SummaryCard from '../SummaryCard';

export default function SummaryCardExample() {
  const mockContent = `Salut Marie ! Alors, ton tirage de Tarot me dit des choses intéressantes. En tant que Balance, Le Fou dans ton passé montre que tu as vécu des moments qui t'ont vraiment fait grandir. C'était pas toujours facile, mais ça t'a rendue plus forte.

En ce moment, La Papesse influence ta vie de manière positive. Tu es dans une période où les choses bougent, et c'est plutôt bon signe pour la suite.

Pour ton futur, L'Empereur annonce de belles choses ! Tu peux t'attendre à des changements heureux qui vont t'apporter satisfaction.

Mon conseil : Marie, avec ton caractère de Balance, fais confiance à ton instinct. Tu as tout ce qu'il faut pour réussir !`;
  
  return (
    <div className="p-8">
      <SummaryCard
        title="Votre Interprétation Personnalisée"
        content={mockContent}
        isVisible={true}
      />
    </div>
  );
}