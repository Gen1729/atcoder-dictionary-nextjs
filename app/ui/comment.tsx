'use client'
import Image from 'next/image';

export default function Comment({ onCommentClick }: { onCommentClick: () => void }) {
  return (
    <button className="flex items-center" style={{lineHeight: 1}} onClick={onCommentClick}>
      <Image src="/commentIcon.svg" alt="コメント" width={30} height={30} className="align-middle" />
    </button>
  );
}
