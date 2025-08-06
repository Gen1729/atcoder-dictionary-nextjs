'use client'

export default function Comment({ onCommentClick }: { onCommentClick: () => void }) {
  return (
    <button className="flex items-center" style={{lineHeight: 1}} onClick={onCommentClick}>
      <img src="/commentIcon.svg" alt="コメント" className="w-[30px] h-[30px] align-middle" />
    </button>
  );
}