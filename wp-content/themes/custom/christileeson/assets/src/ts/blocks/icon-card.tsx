import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { BlockConfiguration, TemplateArray } from '@wordpress/blocks';
import React from 'react';

export const name = 'cl/icon-card';

const blockTemplate: TemplateArray = [
  ['core/image', {}],
  ['core/heading', { level: 3, placeholder: 'Title' }],
  ['core/paragraph', { placeholder: 'Details' }],
];

const attributes = {
  className: 'card__icon'
};

export const settings: BlockConfiguration = {
  title: 'Icon Card',
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
          <InnerBlocks template={blockTemplate} templateLock={'all'} />
        </div>
      </div>
    );
  }
};
