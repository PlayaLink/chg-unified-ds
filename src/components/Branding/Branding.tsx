/**
 * Branding component
 * @figma https://www.figma.com/design/r7KRvL85GNIIMn4iM9gKvo/Design-System--Components--Copy-?node-id=525-6567
 * @storybook https://www.chg-unified-design.com/?path=/story/components-branding--props
 */
'use client'

import { cx, sortCx } from '@/utils/cx'

// Import SVG logos as URLs
import connectLogo from './logos/connect.svg'
import designSystemLogo from './logos/design-system.svg'
import locumsmartLogo from './logos/locumsmart.svg'
import modioLogo from './logos/modio.svg'
import mycompHealthLogo from './logos/mycomphealth.svg'
import myweatherbyLogo from './logos/myweatherby.svg'
import wireframeLogo from './logos/wireframe.svg'

export const styles = sortCx({
  root: 'inline-flex items-center justify-center',
  sizes: {
    sm: { root: 'h-[40px] w-[100px]' },
    md: { root: 'h-[80px] w-[200px]' },
    lg: { root: 'h-[120px] w-[300px]' },
  },
  image: 'h-full w-full object-contain',
})

const logoMap = {
  wireframe: wireframeLogo,
  connect: connectLogo,
  locumsmart: locumsmartLogo,
  modio: modioLogo,
  myweatherby: myweatherbyLogo,
  mycomphealth: mycompHealthLogo,
  'design-system': designSystemLogo,
} as const

export type BrandingBrand = keyof typeof logoMap
export type BrandingSize = keyof typeof styles.sizes

export interface BrandingProps {
  /** The brand logo to display */
  brand: BrandingBrand
  /** The size of the logo container */
  size?: BrandingSize
  /** Additional className */
  className?: string
  /** Alt text for the logo image */
  alt?: string
}

export function Branding({
  brand,
  size = 'md',
  className,
  alt,
}: BrandingProps) {
  const logo = logoMap[brand]
  const defaultAlt = `${brand.charAt(0).toUpperCase() + brand.slice(1).replace('-', ' ')} logo`

  return (
    <div className={cx(styles.root, styles.sizes[size].root, className)}>
      <img
        src={logo}
        alt={alt ?? defaultAlt}
        className={styles.image}
      />
    </div>
  )
}
