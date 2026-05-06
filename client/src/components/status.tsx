export const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'Completed':
      return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-sm">Completed</span>;
    case 'Pending':
      return <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-sm">Pending</span>;
    case 'Cancelled':
      return <span className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-sm">Cancelled</span>;
    default:
      return <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-sm">{status}</span>;
  }
};