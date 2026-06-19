import { PaymentStatus } from "../types/fetch";
import type { PaymentStatusChipProps } from "../types/props";

const statusStyles: Record<PaymentStatus, string> = {
  [PaymentStatus.ALL]:
    "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200",
  [PaymentStatus.PAYMENT_LINK_NOT_GENERATED]:
    "bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200",
  [PaymentStatus.OUTSTANDING]:
    "bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200",
  [PaymentStatus.PAID]:
    "bg-green-100 text-green-800 border border-green-300 hover:bg-green-200",
  [PaymentStatus.OVERDUE]:
    "bg-red-100 text-red-800 border border-red-300 hover:bg-red-200",
};

const statusLabels: Record<PaymentStatus, string> = {
  [PaymentStatus.ALL]: "All Status",
  [PaymentStatus.PAYMENT_LINK_NOT_GENERATED]: "Payment Link Not Generated",
  [PaymentStatus.OUTSTANDING]: "Outstanding",
  [PaymentStatus.PAID]: "Paid",
  [PaymentStatus.OVERDUE]: "Overdue",
};

export const PaymentStatusChip: React.FC<PaymentStatusChipProps> = ({
  status,
}) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full transition-colors duration-200 cursor-default ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
};
