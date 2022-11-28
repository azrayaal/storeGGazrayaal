import Image from 'next/image';

interface TopUpCategoriesProps {
  total: string;
  category1: string;
  category2: string;
  categorylogo: 'categorylogo1' | 'categorylogo2';
}

export default function TopUpCategories(props: TopUpCategoriesProps) {
  const { total, category1, category2, categorylogo } = props;
  return (
    <div className="col-lg-4 ps-15 pe-15 pb-lg-0 pb-4">
      <div className="categories-card">
        <div className="d-flex align-items-center mb-24">
          <Image src={`/icon/${categorylogo}.svg`} width={60} height={60} />
          <p className="color-palette-1 mb-0 ms-12">
            {category1}
            <br />
            {category2}
          </p>
        </div>
        <div>
          <p className="text-sm color-palette-2 mb-1">Total Spent</p>
          <p className="text-2xl color-palette-1 fw-medium m-0">{total}</p>
        </div>
      </div>
    </div>
  );
}
