import Link from 'next/link';
import React from 'react';
import NumberFormat from 'react-number-format';

interface TableRowProps {
  price: string;
  id: string;
  img: string;
  title: string;
  category: string;
  status: string;
}

export default function TableRow(props: TableRowProps) {
  const { price, id, img, title, category, status } = props;

  return (
    <tr data-category="pending" className="align-middle" key={id} id={id}>
      <th scope="row">
        <img className="float-start me-3 mb-lg-0 mb-3" src={img} width="80" height="60" alt="" />
        <div className="game-title-header">
          <p className="game-title fw-medium text-start color-palette-1 m-0">{title}</p>
          <p className="text-xs fw-normal text-start color-palette-2 m-0">{category}</p>
        </div>
      </th>
      <td>
        <p className="fw-medium color-palette-1 m-0">{price}</p>
      </td>
      <td>
        <p className="fw-medium color-palette-1 m-0">
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
          <span className={`float-start icon-status ${status}`} />
          <p className="fw-medium text-start color-palette-1 m-0 position-relative">{status}</p>
        </div>
      </td>
      <td>
        <Link href={`/member/transaction/${id}`}>
          <a className="btn btn-status rounded-pill text-sm">Details</a>
        </Link>
      </td>
    </tr>
  );
}
