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
  save: () => {
    useBlockProps.save();
    const { className } = attributes;

    return (
      <div className={className}>
        <InnerBlocks.Content />
      </div>
    );
  },
  edit: () => {
    const blockProperties = useBlockProps();
    const { className } = attributes;

    return (
      <div {...blockProperties}>
        <div className={className}>
          <InnerBlocks template={blockTemplate} allowedBlocks={allowedBlocks} templateLock={false} />
        </div>
      </div>
    );
  }
};
