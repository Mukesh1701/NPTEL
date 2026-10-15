interface Props {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="bw-card p-6 sm:p-7 max-w-md w-full border border-neutral-700 bg-neutral-950 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-neutral-400 text-sm leading-relaxed mb-6">{message}</p>
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            id="dialog-cancel-btn"
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1 py-2.5 text-sm"
          >
            {cancelLabel}
          </button>
          <button
            id="dialog-confirm-btn"
            type="button"
            onClick={onConfirm}
            className="btn-primary flex-1 py-2.5 text-sm"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
