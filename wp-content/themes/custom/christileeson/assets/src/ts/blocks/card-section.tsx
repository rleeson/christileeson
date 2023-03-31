import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { BlockConfiguration, TemplateArray } from '@wordpress/blocks';
import React from 'react';

export const name = 'cl/card-section';

const allowedBlocks: string[] = [
  'cl/icon-card'
];

const attributes = {
  className: 'card__section'
};

const blockTemplate: TemplateArray = [
  ['cl/icon-card', {}],
  ['cl/icon-card', {}]
];

export const settings: BlockConfiguration = {
  title: 'Card Section',
  apiVersion: 2,
  icon: 'text',
  category: 'layout',
  attributes: {},
  supports: {
    align: true,
    spacing: {
      blockGap: true,
      margin: true,
      padding: true
    }
  },
  save: () => {
    const blockProperties = useBlockProps.save();
    const { className } = attributes;
    const classes: string[] = [blockProperties.className as string, className];

    return (
      <div {...blockProperties} className={classes.join(' ')}>
        <InnerBlocks.Content />
      </div>
    );
  },
  edit: () => {
    const blockProperties = useBlockProps();
    const { className } = attributes;
    const classes: string[] = [blockProperties.className as string, className];

    return (
      <div {...blockProperties} className={classes.join(' ')}>
        <InnerBlocks template={blockTemplate} allowedBlocks={allowedBlocks} templateLock={false} />
      </div>
    );
  }
};
