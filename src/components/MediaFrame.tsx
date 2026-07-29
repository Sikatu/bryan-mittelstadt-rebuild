import { type ReactNode } from 'react';

interface MediaFrameProps {
  /** Aspect ratio class — defaults to 16:9. */
  aspectRatio?: 'video' | 'square' | 'portrait';
  children: ReactNode;
  className?: string;
}

const ratioClasses = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
};

/** Responsive media container maintaining consistent aspect ratios. */
export default function MediaFrame({
  aspectRatio = 'video',
  children,
  className = '',
}: MediaFrameProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-bg-light ${ratioClasses[aspectRatio]} ${className}`}
    >
      {children}
    </div>
  );
}
