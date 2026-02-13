export default function ValentineNoteModal({
    note,
    open,
    onClose,
  }: {
    note: string;
    open: boolean;
    onClose: () => void;
  }) {
    if (!open) return null;
  
    return (
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-[32px] bg-white shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-pink-100 to-rose-100">
            <h2 className="font-semibold text-gray-700">
              Valentine Note 💌
            </h2>
  
            <button onClick={onClose} className="text-gray-500 text-xl">
              ✕
            </button>
          </div>
  
          <div className="p-5">
            <textarea
              value={note}
              readOnly
              className="w-full h-64 resize-none outline-none text-gray-700 leading-7 text-lg"
            />
          </div>
  
          <div className="px-5 pb-5 text-right text-xs text-gray-400">
            Made with Biju Shrestha ❤️
          </div>
        </div>
      </div>
    );
  }
  