import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { BlockConfiguration, TemplateArray } from '@wordpress/blocks';
import React from 'react';
import Classes from '@/ts/utilities/classes';

export const name = 'cl/image-card';

const blockTemplate: TemplateArray = [
  ['core/image', { align:'center' }],
  ['core/heading', { level: 3, placeholder: 'Title' }],
  ['core/paragraph', { placeholder: 'Details' }],
];

const attributes = {
  className: 'card__image'
};

export const settings: BlockConfiguration = {
  title: 'Image Card',
  apiVersion: 2,
  icon: 'text',
  category: 'layout',
  attributes: {},
  save: () => {
    const blockProperties = useBlockProps.save();
    const classes:Classes = Classes.fromMany([(blockProperties.className ?? '') as string, attributes.className] );

    return (
      <div {...blockProperties} className={classes.toString()}>
        <InnerBlocks.Content />
      </div>
    );
  },
  edit: () => {
    const blockProperties = useBlockProps();
    const classes:Classes = Classes.fromMany([(blockProperties.className ?? '') as string, attributes.className] );

    return (
      <div {...blockProperties} className={classes.toString()}>
          <InnerBlocks template={blockTemplate} templateLock={'all'} />
      </div>
    );
  }
};
