import DetailedRankingPageContent from './page.client';

export default function DetailedRankingPage({ params }: { params: { name: string } }) {
  return <DetailedRankingPageContent route={params.name} />;
}
