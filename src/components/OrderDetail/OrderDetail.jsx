import LineItem from '../LineItem/LineItem';
import '../../index.css'
import '../OrderDetail/OrderDetail.css'

// Used to display the details of any order, including the cart (unpaid order)
export default function OrderDetail({order, handleChangeQty, handleCheckout }) {
  
  if (!order) return null;

  const lineItems = order.lineItems.map(item =>
    <LineItem
      lineItem={item}
      isPaid={order.isPaid}
      key={item._id}
      handleChangeQty={handleChangeQty}
    />
  );

  return (
    <div className="OrderDetail">
      <div className="section-heading">
        {order.isPaid ?
          <span>ORDER <span className="smaller">{order.orderId}</span></span>
          :
          <span>My Cart</span>
        }
        <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
      </div>
      <div className="line-item-container flex-ctr-ctr flex-col scroll-y">
        {lineItems.length ?
          <>
            {lineItems}
            <section className="total">
              {order.isPaid ?
                <span className="right">TOTAL&nbsp;&nbsp;</span>
                :
                <button
                  className="button"
                  onClick={handleCheckout}
                  disabled={!lineItems.length}
                >CHECKOUT</button>
              }
              <br/>
              <span>NUMBER OF ITEMS: {order.totalQty}</span>
              <br/>
              <span className="right">TOTAL: ${order.orderTotal.toFixed(2)}</span>
            </section>
          </>
          :
          <div className="Empty">Empty Cart</div>
        }
      </div>
    </div>
  );
}