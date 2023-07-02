// import './LineItem.css'
// export default function LineItem({ lineItem, isPaid, handleChangeQty,}) {
  

//   console.log('this is isItemAvailable', isItemAvailable)
//   console.log('this is lineItem.item.stock ', lineItem.item.stock)

//   return (
//     <div className="LineItem">
//       <div className='lineItem-picture'>
//       <img src={lineItem.item.picture} alt={lineItem.item.name} />
//       </div>
//       <div className="flex-ctr-ctr flex-col">
//         <span className="lineItem-name">{lineItem.item.name}</span>
//         <span>{lineItem.item.price.toFixed(2)}</span>
//       </div>
//       <div className="qty" style={{ justifyContent: isPaid && 'center' }}>
//         {!isPaid &&
//           <button
//             className="btn-xs"
//             onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
//           >−</button>
//         }
//         <span>{lineItem.qty}</span>
//         {!isPaid &&
//           <button
//             className="btn-xs"
//             onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
//           >+</button>
//         }
//       </div>
//       <div className="ext-price">${lineItem.extPrice.toFixed(2)}</div>
//     </div>
//   );
// }


// import './LineItem.css'

// export default function LineItem({ lineItem, isPaid, handleChangeQty }) {
//   const isItemAvailable = lineItem.item.stock > 0;

//   return (
//     <div className="LineItem">
//       <div className="lineItem-picture">
//         <img src={lineItem.item.picture} alt={lineItem.item.name} />
//       </div>
//       <div className="flex-ctr-ctr flex-col">
//         <span className="lineItem-name">{lineItem.item.name}</span>
//         <span>{lineItem.item.price.toFixed(2)}</span>
//       </div>
//       <div className="qty" style={{ justifyContent: isPaid && 'center' }}>
//         {!isPaid && (
//           <button
//             className="btn-xs"
//             onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
//             disabled={!isItemAvailable} 
//           >
//             −
//           </button>
//         )}
//         <span>{lineItem.qty}</span>
//         {!isPaid && (
//           <button
//             className="btn-xs"
//             onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
//             disabled={!isItemAvailable} 
//           >
//             +
//           </button>
//         )}
//       </div>
//       <div className="ext-price">${lineItem.extPrice.toFixed(2)}</div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import './LineItem.css';

// export default function LineItem({ lineItem, isPaid, handleChangeQty }) {
//   const [isItemAvailable, setIsItemAvailable] = useState(lineItem.item.stock > 0);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleIncreaseQty = () => {
//     if (lineItem.qty + 1 > lineItem.item.stock) {
//       setIsItemAvailable(false);
//       setErrorMessage(`Only ${lineItem.item.stock} ${lineItem.item.name} left in stock`);
//       return;
//     }

//     handleChangeQty(lineItem.item._id, lineItem.qty + 1);
//   };

//   const handleDecreaseQty = () => {
//     setIsItemAvailable(true);
//     setErrorMessage('');
//     handleChangeQty(lineItem.item._id, lineItem.qty - 1);
//   };

//   return (
//     <div className="LineItem">
//       <div className="lineItem-picture">
//         <img src={lineItem.item.picture} alt={lineItem.item.name} />
//       </div>
//       <div className="flex-ctr-ctr flex-col">
//         <span className="lineItem-name">{lineItem.item.name}</span>
//         <span>{lineItem.item.price.toFixed(2)}</span>
//       </div>
//       <div className="qty" style={{ justifyContent: isPaid && 'center' }}>
//         {!isPaid && (
//           <button
//             className="btn-xs"
//             onClick={handleDecreaseQty}
//             disabled={lineItem.qty <= 1}
//           >
//             −
//           </button>
//         )}
//         <span>{lineItem.qty}</span>
//         {!isPaid && (
//           <button
//             className="btn-xs"
//             onClick={handleIncreaseQty}
//             disabled={!isItemAvailable}
//           >
//             +
//           </button>
//         )}
//       </div>
//       <div className="ext-price">${lineItem.extPrice.toFixed(2)}</div>
//       {!isItemAvailable && <div className="error-message">{errorMessage}</div>}
//     </div>
//   );
// }

import React, { useState } from 'react';
import './LineItem.css';

export default function LineItem({ lineItem, isPaid, handleChangeQty }) {
  const [isItemAvailable, setIsItemAvailable] = useState(lineItem.item.stock > 0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleIncreaseQty = () => {
    if (lineItem.qty + 1 > lineItem.item.stock) {
      setIsItemAvailable(false);
      setErrorMessage(`Only ${lineItem.item.stock} ${lineItem.item.name} left in stock`);
      return;
    }

    handleChangeQty(lineItem.item._id, lineItem.qty + 1);
  };

  const handleDecreaseQty = () => {
    setIsItemAvailable(true);
    setErrorMessage('');
    handleChangeQty(lineItem.item._id, lineItem.qty - 1);
  };

  const handleRemoveItem = () => {
    handleChangeQty(lineItem.item._id, 0);
  };

  return (
    <div className="LineItem">
      <div className="lineItem-picture">
        <img src={lineItem.item.picture} alt={lineItem.item.name} />
      </div>
      <div className="flex-ctr-ctr flex-col">
        <span className="lineItem-name">{lineItem.item.name}</span>
        <span>${lineItem.item.price.toFixed(2)}</span>
      </div>
      <div className="qty" style={{ justifyContent: isPaid && 'center' }}>
        {!isPaid && (
          <button
            className="btn-xs"
            onClick={handleDecreaseQty}
            disabled={lineItem.qty <= 1}
          >
            −
          </button>
        )}
        <span>{lineItem.qty}</span>
        {!isPaid && (
          <button
            className="btn-xs"
            onClick={handleIncreaseQty}
            disabled={!isItemAvailable}
          >
            +
          </button>
        )}
      </div>
      <div className="ext-price">${lineItem.extPrice.toFixed(2)}</div>
      {!isItemAvailable && <div className="error-message">{errorMessage}</div>}
      {!isPaid && (
        <button className="btn-sm" onClick={handleRemoveItem}>
          REMOVE ITEM FROM CART
        </button>
      )}
    </div>
  );
}
