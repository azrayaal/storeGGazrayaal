import cx from 'classnames';
import NumberFormat from 'react-number-format';

interface ItemHistoryProps {
  image: string;
  gameName: string;
  type: string;
  item: string;
  price: number;
  status: string;
}

export default function ItemHistory(props: ItemHistoryProps) {
  // eslint-disable-next-line object-curly-newline
  const { gameName, type, item, price, image, status } = props;
  const statusClass = cx({
    'float-start icon-status': true,
    success: status === 'success',
    pending: status === 'pending',
    failed: status === 'failed',
  });
  return (
    <tr className="align-middle ">
      <th scope="row">
        <img className="float-start me-3 mb-lg-0 mb-3" src={image} width="80" height="60" alt="" />
        <div className="game-title-header">
          <p className="game-title fw-medium text-start color-palette-1 m-0">{gameName}</p>
          <p className="text-xs fw-normal text-start color-palette-2 m-0">{type}</p>
        </div>
      </th>
      <td>
        <p className="fw-medium color-palette-1 m-0">{item}</p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">
          <NumberFormat
            // eslint-disable-next-line react/jsx-indent-props
            value={price}
            prefix="RP. "
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        </p>
      </td>
      <td>
        <div>
          <span className={statusClass} />
          <p className="fw-medium text-start color-palette-1 m-0 position-relative">{status}</p>
        </div>
      </td>
    </tr>
  );
}
