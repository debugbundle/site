import type { ComponentProps, ImgHTMLAttributes, ReactElement } from 'react';
import type { LoaderConfig, LoaderOutput, Page } from 'fumadocs-core/source';
import defaultMdxComponents, { createRelativeLink } from 'fumadocs-ui/mdx';
import { Tab as FumadocsTab, Tabs as FumadocsTabs } from 'fumadocs-ui/components/tabs';

import {
  Notice,
  SurfaceCard,
  SurfaceGrid,
  TerminalExample,
  WorkflowDiagram,
  WorkflowStep,
} from '@/components/content-blocks';
import { normalizeSiteHref } from '@/seo';

type MdxImageResult = ReturnType<(typeof defaultMdxComponents)['img']>;
type TabsProps = ComponentProps<typeof FumadocsTabs>;
type TabProps = ComponentProps<typeof FumadocsTab>;

type PageMdxComponents = typeof defaultMdxComponents & {
  a: ReturnType<typeof createRelativeLink>;
  img: typeof MdxImage;
  Notice: typeof Notice;
  SurfaceCard: typeof SurfaceCard;
  SurfaceGrid: typeof SurfaceGrid;
  Tab: typeof Tab;
  Tabs: typeof Tabs;
  TerminalExample: typeof TerminalExample;
  WorkflowDiagram: typeof WorkflowDiagram;
  WorkflowStep: typeof WorkflowStep;
};

function MdxImage(props: ImgHTMLAttributes<HTMLImageElement>): MdxImageResult {
  const { sizes, ...rest } = props;

  if (sizes === undefined) {
    return defaultMdxComponents.img(rest);
  }

  return defaultMdxComponents.img({ ...rest, sizes });
}

function Tabs({ className, ...props }: TabsProps): ReactElement {
  return <FumadocsTabs className={['my-4', className].filter(Boolean).join(' ')} {...props} />;
}

function Tab({ className, ...props }: TabProps): ReactElement {
  return <FumadocsTab className={['rounded-t-none', className].filter(Boolean).join(' ')} {...props} />;
}

export function createPageMdxComponents<C extends LoaderConfig>(source: LoaderOutput<C>, page: Page): PageMdxComponents {
  const RelativeLink = createRelativeLink(source, page);

  return {
    ...defaultMdxComponents,
    a: ((props) => (
      <RelativeLink
        {...props}
        href={typeof props.href === 'string' ? normalizeSiteHref(props.href) : props.href}
      />
    )) as PageMdxComponents['a'],
    img: MdxImage,
    Notice,
    SurfaceCard,
    SurfaceGrid,
    TerminalExample,
    Tab,
    Tabs,
    WorkflowDiagram,
    WorkflowStep,
  };
}
