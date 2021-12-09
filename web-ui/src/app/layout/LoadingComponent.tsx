import { Spinner } from "react-bootstrap";
interface Props {
  content?: string;
}

export default function LoadingComponent({ content }: Props) {
  return (
<<<<<<< HEAD
    <div className="d-flex align-items-center justify-content-center">
=======
    <div className="border d-flex align-items-center justify-content-center">
>>>>>>> ba069e4560f416f08da4fc63ee7648283e8b3f9a
      <Spinner animation="border" variant="dark">
        <span className="visually-hidden">{content}...</span>
      </Spinner>
    </div>
  );
}
