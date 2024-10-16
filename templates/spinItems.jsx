import React, { useState, useEffect } from 'react';
import { compile, templates } from 'core/js/reactHelpers';
export default function SpinItems(props) {
  const { _items, _isInview, _useTitle, _spinLabel, _clockwise, onSpin } = props;
  const [selectedItem, setSelectedItem] = useState(null);

  const [spinning, setSpinning] = useState('');
  const [spinEnd, setSpinEnd] = useState(false);

  useEffect(() => {
    if (!_isInview) return;
    setSpinEnd(false);

    setTimeout(() => {
      const activeItem = _items.find((item) => item._isActive);
      setSpinning(activeItem !== null ? (_clockwise ? 'spinning' : 'spinning-clockwise') : '');
      setSelectedItem(activeItem);
    }, 500);
    setTimeout(() => {
      setSpinEnd(true);
    }, _items.length * 250);
    return () => {
      setSpinEnd(false);
    };
  }, [_items, _isInview, _clockwise]);
  return (
    <div className='component__inner spinitems__inner'>
      <templates.header {...props} />
      <div className='component__widget spinitems__widget'>
        <div className='spinitems__wheel'>
          <div className='wheel-container'>
            <div
              className={`wheel ${spinning}`}
              style={{
                cursor: !spinEnd ? 'default' : 'pointer',
                '--nb-item': _items.length,
                '--selected-item': selectedItem !== null ? selectedItem?._index : null
              }}
              onClick={(e) => (spinEnd ? onSpin(e) : null)}
            >
              {_items.map(({ title, _index }, index) => (
                <div className='wheel-item' key={index} style={{ '--item-nb': index }}>
                  {_useTitle ? title : _index + 1}
                </div>
              ))}
              <button className='wheel__spin-button' aria-label={_spinLabel} onClick={(e) => (spinEnd ? onSpin(e) : null)}></button>
            </div>
          </div>

          <div className={`wheel__item-content ${spinEnd ? null : 'hide'}`}>
            <div className='wheel__item-title'>
              {selectedItem && selectedItem?.title && (
                <span
                  className='wheel__item-title-inner'
                  aria-hidden='true'
                  dangerouslySetInnerHTML={{ __html: compile(selectedItem?.title) }}
                ></span>
              )}
            </div>
            <div className='wheel__item-body'>
              {selectedItem && selectedItem?.body && (
                <span className='wheel__item-body-inner' aria-hidden='true' dangerouslySetInnerHTML={{ __html: compile(selectedItem?.body) }}></span>
              )}
            </div>
            <templates.image {...selectedItem?._graphic} classNamePrefixes={['component', 'spinItems']} />
          </div>
        </div>
      </div>
    </div>
  );
}
