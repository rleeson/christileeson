import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { BlockConfiguration, TemplateArray } from '@wordpress/blocks';
import { PanelBody, Button, ResponsiveWrapper } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import React from 'react';
import Classes from '@/ts/utilities/classes';
import { BlockEditProps } from '@wordpress/blocks';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface HomeHeroAttributes extends Record<string, any> {
  [x: string]: any;
  mediaId: number;
  mediaUrl: string;
}

type MediaObject = {
  id: number;
  media_details: { height: number, width: number };
  source_url: string;
  url: string;
}

export const BLOCK_CLASS = 'hero__home';

export const name = 'cl/hero-home';

const allowedBlocks: string[] = [
  'core/button',
  'core/heading',
  'core/image',
  'core/group',
  'core/paragraph',
];

const blockTemplate: TemplateArray = [
  ['core/group', {}, [
    ['core/heading', {level: 1, placeholder: 'Heading text here'}],
    ['core/paragraph', {placeholder: 'Sub-heading text here'}],
    ['core/paragraph', {placeholder: 'Extra paragraph'}],
  ]],
  ['core/image', {}],
];

const backgroundImage = (id: number, url: string): JSX.Element => {
  const srcUrl = "url('" + url + "')";
  return 0 < id
    ? <div className='hero__home-background' style={{backgroundImage: srcUrl}} />
    : <></>;
}

export const settings: BlockConfiguration<HomeHeroAttributes> = {
  title: 'Hero (Homepage)',
  apiVersion: 2,
  icon: 'text',
  category: 'layout',
  attributes: {
    align: {
      type: 'string',
      default: 'wide'
    },
    layout: {
      // @ts-expect-error -- Valid in newer WordPress versions, not typed
      type: "constrained"
    },
    mediaId: {
      type: 'number',
      default: 0
    },
    mediaUrl: {
      type: 'string',
      default: ''
    }
  },
  supports: {
    align: ['full', 'wide']
  },
  save: ({ attributes }) => {
    const blockProperties = useBlockProps.save();
    const { mediaId, mediaUrl } = attributes;
    const classes: Classes = Classes.fromMany([(blockProperties.className ?? '') as string, BLOCK_CLASS]);

    return (
      <div {...blockProperties} className={classes.toString()}>
        {backgroundImage(mediaId, mediaUrl)}
        <div className='hero__home-content'>
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
  edit: ({ attributes, setAttributes }: BlockEditProps<HomeHeroAttributes>) => {
    const { mediaId, mediaUrl } = attributes;
    const media: MediaObject = useSelect((select) => {
      // @ts-expect-error -- Valid store query, not typed
      return select('core').getMedia(mediaId);
    }, [mediaId]);
    const blockProperties = useBlockProps();
    const classes: Classes = Classes.fromMany([(blockProperties.className ?? '') as string, BLOCK_CLASS]);
    const hasMediaId: boolean = 0 !== mediaId;
   
    const removeMedia = () => {
      setAttributes({
        mediaId: 0,
        mediaUrl: ''
      });
    }

    const onSelectMedia = (media: MediaObject) => {
      setAttributes({
        mediaId: media.id,
        mediaUrl: media.url
      });
    }

    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__('Select background image', 'awp')}
            initialOpen={true}
          >
            <div className="editor-post-featured-image">
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={onSelectMedia}
                  value={mediaId}
                  allowedTypes={['image']}
                  render={({ open }) => (
                    <Button
                      className={!hasMediaId ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                      onClick={open}
                    >
                      {!hasMediaId ? __('Choose an image', 'christileeson') : <></>}
                      {undefined !== media
                        ? <ResponsiveWrapper
                            naturalWidth={media.media_details.width}
                            naturalHeight={media.media_details.height}
                          >
                            <img src={media.source_url} />
                          </ResponsiveWrapper>
                        : <></>
                      }
                    </Button>
                  )}
                />
              </MediaUploadCheck>
              {hasMediaId
                ? <MediaUploadCheck>
                    <MediaUpload
                      title={__('Replace image', 'awp')}
                      value={mediaId}
                      onSelect={onSelectMedia}
                      allowedTypes={['image']}
                      render={({ open }) => (
                        <Button onClick={open} variant='link'>{__('Replace image', 'christileeson')}</Button>
                      )}
                    />
                  </MediaUploadCheck>
                : <></>
              }
              {hasMediaId
                ? <MediaUploadCheck>
                    <Button onClick={removeMedia} isDestructive>{__('Remove image', 'christileeson')}</Button>
                  </MediaUploadCheck>
                : <></>
              }
            </div>
          </PanelBody>
        </InspectorControls>
        <div {...blockProperties} className={classes.toString()}>
          {backgroundImage(mediaId, mediaUrl)}
          <div className='hero__home-content'>
            <InnerBlocks template={blockTemplate} allowedBlocks={allowedBlocks} templateLock={false} />
          </div>
        </div>
      </>
    );
  }
};
