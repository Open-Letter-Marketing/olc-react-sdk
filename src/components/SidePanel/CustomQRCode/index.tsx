import React, { useEffect, useState } from 'react';

// Import Polotno and third-party libraries
import QRCode from 'qrcode';
import { observer } from 'mobx-react-lite';
import { SectionTab } from 'polotno/side-panel';
import type { StoreType } from 'polotno/model/store';
import * as svg from 'polotno/utils/svg';

// Hooks
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { failure } from '../../../redux/actions/snackbarActions';

// Utils
import { MESSAGES } from '../../../utils/message';

// UI Components
import { Button } from '@blueprintjs/core';
import Input from '../../../components/GenericUIBlocks/Input';

// Icons
import CustomQRIcon from '../../../assets/images/templates/custom-qr-section-icon'


interface CustomQRProps {
  store: StoreType;
}


// define the new custom section
const CustomQRCode = {
  name: 'QR-Section',
  Tab: (props: any) => (
    <SectionTab name="QR" {...props} iconSize={20}>
      <CustomQRIcon />
    </SectionTab>
  ),

  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }: CustomQRProps) => {
    const [val, setVal] = useState('');

    const el = store.selectedElements[0];
    const isQR = el?.name === 'qr';

    const dispatch: AppDispatch = useDispatch();

    const clearQRFields = () => {
      store.selectElements([]);
      setVal('');
    }

    // create svg image for QR code for input text
    const getQR = (text: string) => {
      return new Promise((resolve) => {
        QRCode.toString(
          text || 'no-data',
          {
            type: 'svg',
            color: {
              dark: '#000000',
              light: '#0000',
            },
          },
          (err: any, string: string) => {
            resolve(svg.svgToURL(string));
          }
        );
      });
    }

    const addNewQRCode = async () => {
      if (val) {
        const randomizedId = Math.random().toString(36).substring(2, 7);
        const src = await getQR(val);
        store.activePage.addElement({
          id: `qr-${randomizedId}`,
          type: 'svg',
          name: 'qr',
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          keepRatio: true,
          src,
          custom: {
            value: val,
          },
        });
        clearQRFields();
      } else {
        dispatch(failure(MESSAGES.TEMPLATE.QR_SECTION.EMPTY_QR))
      }
    }

    // if selection is changed we need to update input value
    useEffect(() => {
      if (el?.name === 'qr') {
        setVal(el?.custom.value);
      } else {
        setVal('');
      }
    }, [isQR, el]);

    // update image src when we change input data
    useEffect(() => {
      if (isQR) {
        getQR(val).then((src) => {
          el.set({
            src,
            custom: {
              value: val,
            },
          });
        });
      }
    }, [el, val, isQR]);

    return (
      <div>
        <Input
          type="text"
          onChange={(e) => {
            setVal(e.target.value);
          }}
          placeholder={MESSAGES.TEMPLATE.QR_SECTION.QR_PLACEHOLDER}
          value={val}
        />
        <Button
          onClick={isQR ? clearQRFields : addNewQRCode}
          style={{ width: '100%', padding: '5px', marginTop: '10px', backgroundColor: '#f6f7f9', boxShadow: 'inset 0 0 0 1px #11141833,0 1px 2px #1114181a', color: '#1c2127' }}
        >
          {isQR ? MESSAGES.TEMPLATE.QR_SECTION.CANCEL_BUTTON : MESSAGES.TEMPLATE.QR_SECTION.SUBMIT_BUTTON}
        </Button>
      </div>
    );
  }),
};

export default CustomQRCode;