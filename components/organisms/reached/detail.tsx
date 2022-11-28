interface DetailProps {
  detail1: string;
  detail2: string;
}

export default function DetailReached(props: DetailProps) {
  const { detail1, detail2 } = props;
  return (
    <div className="me-lg-35">
      <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">{detail1}</p>
      <p className="text-lg text-lg-start text-center color-palette-2 m-0">{detail2}</p>
    </div>
  );
}
