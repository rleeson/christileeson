import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { BlockAttributes, BlockConfiguration, TemplateArray } from '@wordpress/blocks';
import React from 'react';
import Classes from '@/ts/utilities/classes';

export const name = 'cl/card-section';

const allowedBlocks: string[] = [
  'cl/image-card'
];

const attributes: BlockAttributes = {
  align: {
    type: 'string',
    default: 'wide'
  },
  className: 'card__section',
  layout: {
    type: "constrained"
  }
};

const blockTemplate: TemplateArray = [
  ['cl/image-card', {}],
  ['cl/image-card', {}]
];

export const settings: BlockConfiguration = {
  title: 'Card Section',
  apiVersion: 2,
  icon: 'text',
  category: 'layout',
  attributes: attributes,
  supports: {
    align: [ 'full', 'wide' ],
    color: {
      background: true,
      text: false
    },
    spacing: {
      blockGap: true,
      margin: true,
      padding: true
    }
  },
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
        <InnerBlocks template={blockTemplate} allowedBlocks={allowedBlocks} templateLock={false} />
      </div>
    );
  }
};
