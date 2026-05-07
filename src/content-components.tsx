import type { ImgHTMLAttributes } from 'react';
import type { LoaderConfig, LoaderOutput, Page } from 'fumadocs-core/source';
import defaultMdxComponents, { createRelativeLink } from 'fumadocs-ui/mdx';

import { Notice, SurfaceCard, SurfaceGrid, TerminalExample } from '@/components/content-blocks';

type MdxImageResult = ReturnType<(typeof defaultMdxComponents)['img']>;

type PageMdxComponents = typeof defaultMdxComponents & {
  a: ReturnType<typeof createRelativeLink>;
  img: typeof MdxImage;
  Notice: typeof Notice;
  SurfaceCard: typeof SurfaceCard;
  SurfaceGrid: typeof SurfaceGrid;
  TerminalExample: typeof TerminalExample;
};

function MdxImage(props: ImgHTMLAttributes<HTMLImageElement>): MdxImageResult {
  const { sizes, ...rest } = props;

  if (sizes === undefined) {
    return defaultMdxComponents.img(rest);
  }

  return defaultMdxComponents.img({ ...rest, sizes });
}

export function createPageMdxComponents<C extends LoaderConfig>(source: LoaderOutput<C>, page: Page): PageMdxComponents {
  return {
    ...defaultMdxComponents,
    a: createRelativeLink(source, page),
    img: MdxImage,
    Notice,
    SurfaceCard,
    SurfaceGrid,
    TerminalExample,
  };
}