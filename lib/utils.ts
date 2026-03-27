export function formatDate(date?: string) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function getThumbnail(src?: string) {
  return src || 'https://placehold.co/300x300?text=Music';
}
