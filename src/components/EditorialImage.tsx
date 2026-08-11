import Image from 'next/image';
import type { ImageAsset } from '@/types';

interface EditorialImageProps {
  asset: ImageAsset;
  sizes: string;
  priority?: boolean;
  preload?: boolean;
  decorative?: boolean;
  className?: string;
  imageClassName?: string;
  fallbackLabel?: string;
}

const toneClasses: Record<NonNullable<ImageAsset['tone']>, string> = {
  warm: 'from-[#e7ddd0] via-[#f5f0e9] to-[#cbb9a4] text-[#513a2a]',
  dark: 'from-[#171717] via-[#2d2925] to-[#6d4b38] text-white',
  neutral: 'from-[#d7d4ce] via-[#f1efeb] to-[#b8b3ab] text-[#35322e]',
  accent: 'from-[#6f3f28] via-[#a56a48] to-[#dfc3ad] text-white',
};

/**
 * Renders an approved image when available and an honest editorial fallback
 * when the client asset is still pending. The fallback is intentionally not an
 * image placeholder and never suggests that it is Bryan's photography.
 */
export default function EditorialImage({
  asset,
  sizes,
  priority = false,
  preload = false,
  decorative = false,
  className = '',
  imageClassName = '',
  fallbackLabel,
}: EditorialImageProps) {
  const isAvailable = asset.availability === 'available' && Boolean(asset.src);

  if (isAvailable && asset.src) {
    return (
      <Image
        src={asset.src}
        alt={decorative ? '' : asset.alt}
        fill
        priority={priority}
        preload={preload}
        className={`object-cover ${imageClassName}`}
        sizes={sizes}
        style={{ objectPosition: asset.objectPosition ?? '50% 50%' }}
      />
    );
  }

  const tone = asset.tone ?? 'warm';
  const stateLabel =
    asset.availability === 'withheld'
      ? 'Image withheld from publication'
      : 'Approved image pending';

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${toneClasses[tone]} ${className}`}
      data-asset-id={asset.id}
      data-asset-state={asset.availability}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : `${asset.label}. ${stateLabel}.`}
      aria-hidden={decorative ? true : undefined}
    >
      <div className="absolute -right-[18%] -top-[22%] h-[72%] w-[72%] rounded-full border border-current/10" />
      <div className="absolute -bottom-[32%] -left-[16%] h-[78%] w-[78%] rounded-full border border-current/10" />
      <div className="absolute inset-y-0 left-[28%] w-px rotate-[18deg] bg-current/10" />
      <div className="absolute inset-y-0 right-[24%] w-px -rotate-[14deg] bg-current/10" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(115deg, transparent 0%, transparent 47%, currentColor 48%, transparent 49%, transparent 100%)',
        }}
      />

      <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-60">
          {fallbackLabel ?? stateLabel}
        </p>
        <p className="mt-2 max-w-[22rem] font-serif text-xl leading-tight sm:text-2xl">
          {asset.label}
        </p>
      </div>
    </div>
  );
}
