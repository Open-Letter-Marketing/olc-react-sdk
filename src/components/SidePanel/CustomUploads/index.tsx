import React, { useEffect, useState } from 'react';

// Third Party Libraries
import { observer } from 'mobx-react-lite';
import type { StoreType } from 'polotno/model/store';
import {
  ImagesGrid,
  UploadSection as DefaultUploadSection,
} from 'polotno/side-panel';
import { getImageSize, getCrop } from 'polotno/utils/image';

// Hooks
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { uploadFile } from '../../../redux/actions/templateActions';
import { failure } from '../../../redux/actions/snackbarActions';
import { SET_UPLOADED_IMAGES } from '../../../redux/actions/action-types';
import { AppDispatch, RootState } from '../../../redux/store';

// Utils
import { getType } from '../../../utils/helper';
import { allowedImageTypes } from '../../../utils/constants';
import { MESSAGES } from '../../../utils/message';

// UI Components
import { Button } from '@blueprintjs/core';


interface UploadPanelProps {
  store: StoreType;
}

export const UploadPanel = observer(({ store } : UploadPanelProps) => {
  const [images, setImages] = useState<Array<{
    url: string;
    type: string;
  }>>([]);
  const [isUploading, setUploading] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch()

  const uploadedImages = useSelector(
    (state: RootState) => state.templates.uploadedImages
  );


  const load = async () => {
    if (uploadedImages) {
      setLoading(true);
      setImages(uploadedImages);
      setLoading(false);
    }
  };

  const validateFile = (file: File) => {
    if (!file || !allowedImageTypes.includes(file?.type)) {
      dispatch(failure(MESSAGES.TEMPLATE.CUSTOM_UPLOAD_SECTION.TYPE_VALIDATION))
      return false;
    } 
    if (file.size >= 5200000) { // 5MB limit
      dispatch(failure(MESSAGES.TEMPLATE.CUSTOM_UPLOAD_SECTION.SIZE_VALIDATION));
      return false;
    }
    return true;
  }

  const handleFileInput = async (e: any) => {
    try {
      const { target } = e;
      for (const file of target.files) {
        const type = getType(file);
        const validate = validateFile(file);
        if (!validate) { 
          target.value = null;
          return;
        }
        setUploading(true);
        const uploadedFile = await uploadFile(file);
        const allImages = [...images, { url: uploadedFile, type }]
        setImages(allImages);
        dispatch({ type: SET_UPLOADED_IMAGES, payload: allImages });
      }
      setUploading(false);
      target.value = null;
    } catch (error) {
      return error;
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{height: '40px', paddingTop: '5px'}}>{MESSAGES.TEMPLATE.CUSTOM_UPLOAD_SECTION.HEADING}</div>
      <div style={{height: '35px'}}><strong>{MESSAGES.TEMPLATE.CUSTOM_UPLOAD_SECTION.ACCEPTED_FORMATS}</strong></div>
      <div style={{height: '35px', paddingBottom: '15px'}}><strong>{MESSAGES.TEMPLATE.CUSTOM_UPLOAD_SECTION.MAX_SIZE}</strong></div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="input-file">
          <Button
            icon="upload"
            style={{ width: '100%', backgroundColor: '#f6f7f9', boxShadow: 'inset 0 0 0 1px #11141833,0 1px 2px #1114181a', color: '#1c2127'}}
            onClick={() => {
              (document.querySelector('#input-file') as HTMLInputElement)?.click();
            }}
            loading={isUploading}
            intent="primary"
          >
            {MESSAGES.TEMPLATE.CUSTOM_UPLOAD_SECTION.UPLOAD_BTN_TEXT}
          </Button>
          <input
            type="file"
            id="input-file"
            style={{ display: 'none' }}
            onChange={handleFileInput}
            multiple
          />
        </label>
      </div>
      <ImagesGrid
        images={images}
        getPreview={(image) => image?.url}
        crossOrigin={undefined}
        isLoading={isLoading}
        onSelect={async (item, pos, element) => {
          const image = item?.url;
          const type = item?.type;

          let { width, height } = await getImageSize(image);

          if (
            element &&
            element.type === 'svg' &&
            element.contentEditable &&
            type === 'image'
          ) {
            element.set({ maskSrc: image });
            return;
          }

          if (
            element &&
            element.type === 'image' &&
            element.contentEditable &&
            type == 'image'
          ) {
            const crop = getCrop(element, {
              width,
              height,
            });
            element.set({ src: image, ...crop });
            return;
          }

          const scale = Math.min(store.width / width, store.height / height, 1);
          width = width * scale;
          height = height * scale;

          const x = (pos?.x || store.width / 2) - width / 2;
          const y = (pos?.y || store.height / 2) - height / 2;

          store.activePage?.addElement({
            type,
            src: image,
            x,
            y,
            width,
            height,
          });
        }}
      />
    </div>
  );
});

DefaultUploadSection.Panel = UploadPanel;

export default UploadPanel;