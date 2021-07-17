import { useState } from "react";
import { withRouter } from "react-router";
import QrReader from "react-qr-reader";

function QrScan() {
  const [result, setResult] = useState("QR 코드를 인식해주세요.");

  const handleScan = (data: any) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center">
      <div className="flex flex-col items-center my-5 md:m-5 w-full">
        <div className="text-3xl md:text-5xl font-bold mb-5 text-gray-600">QR 인식</div>
        <QrReader className="w-full md:w-2/3 lg:w-1/2" delay={300} onError={handleError} onScan={handleScan} />
        <p className="mt-5 font-bold">{result}</p>
      </div>
    </div>
  );
}

export default withRouter(QrScan);
