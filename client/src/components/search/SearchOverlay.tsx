import { useEffect } from "react";
import { Button } from "../common/Button";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export function SearchOverlay({ onClose, children }: Props) {
  
  useEffect(() => {
    // 검색 페이지 숨김
    document.body.style.overflow = 'hidden';
    // 검색 페이지 출력
    return () => { document.body.style.overflow = 'auto' };
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-50 flex justify-center items-start pt-10 overflow-auto">
      <div className="w-full max-w-md px-4">
        <div className="mb-4">
          <Button
            icon="back"
            onClick={onClose}
            className="hover:bg-gray-100 transition-colors p-2 rounded-full"
          />
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}