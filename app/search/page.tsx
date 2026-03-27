import SearchSkeleton from '@/components/SearchSkeleton';

export default function SearchPage() {
  return (
    <div className="space-y-4 p-2">
      <h1 className="text-2xl font-semibold">Search</h1>
      <SearchSkeleton />
      <SearchSkeleton />
    </div>
  );
}
